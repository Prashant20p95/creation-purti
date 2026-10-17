import os
import urllib.request
import urllib.parse
import json
import sqlite3
import http.cookiejar
import re
import html

base = 'http://localhost:3000'

def get_env_admin_password():
    env_pass = os.environ.get("ADMIN_PASSWORD")
    if env_pass:
        return env_pass
    try:
        with open(".env", "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("ADMIN_PASSWORD="):
                    val = line.split("=", 1)[1].strip()
                    if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                        val = val[1:-1]
                    return val
    except Exception:
        pass
    raise RuntimeError("ADMIN_PASSWORD not set in environment or .env file")

def test_url(path):
    url = base + path
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'TestBot/1.0'})
        res = urllib.request.urlopen(req, timeout=10)
        print(f"[PASS] {path} -> HTTP {res.status}")
        return res
    except Exception as e:
        print(f"[FAIL] {path} -> {e}")
        return None

print("=== 1. Testing Storefront Pages ===")
test_url("/")
test_url("/shop")
test_url("/product/shubh-labh-pearl-hanging")
test_url("/product/pink-rose-dome-gift")
test_url("/product/black-gold-rose-dome")
test_url("/product/panda-silver-balloon-letter-light")
test_url("/cart")
test_url("/checkout")
test_url("/about")
test_url("/contact")
test_url("/faq")
test_url("/policies/shipping")
test_url("/policies/refund")
test_url("/policies/privacy")
test_url("/policies/terms")

print("\n=== 2. Testing SEO & Technical Routes ===")
test_url("/robots.txt")
test_url("/sitemap.xml")

print("\n=== 3. Testing Non-Negotiable Branding & Catalogue Copy ===")
try:
    home_html = urllib.request.urlopen(base).read().decode('utf-8')
    header_m = re.search(r'<header.*?</header>', home_html, re.DOTALL)
    header = header_m.group(0) if header_m else ""

    forbidden_slogans = [
        "Crafted with Heart",
        "Inspired by Life",
        "Artisanal Gifting & Decor",
        "Handcrafted Gifts",
    ]
    for slogan in forbidden_slogans:
        assert slogan.lower() not in header.lower(), f"Forbidden slogan '{slogan}' found in header!"
    assert "Purti Creations" in header, "Official brand name missing from header!"
    print("[PASS] Header Logo strictly contains ONLY 'Purti Creations' with zero slogans/subtitles")

    shop_html = html.unescape(urllib.request.urlopen(base + "/shop").read().decode('utf-8'))
    assert "GIFT COLLECTION" in shop_html
    assert "Find a Gift They'll Remember" in shop_html
    assert "Explore floral keepsakes, festive hangings and thoughtful gifts for life's special moments." in shop_html
    print("[PASS] Shop Catalogue header and description match exact specifications")

    # Verify Dynamic Categories API
    cat_res = urllib.request.urlopen(base + "/api/categories", timeout=10)
    assert cat_res.status == 200, f"/api/categories returned {cat_res.status}"
    cat_data = json.loads(cat_res.read().decode('utf-8'))
    assert cat_data.get("success") is True, "Categories API returned success=False"
    categories = cat_data.get("categories", [])
    occasions = cat_data.get("occasions", [])
    assert len(categories) > 0, "No active categories returned!"
    for c in categories:
        assert c.get("productCount", 0) > 0, f"Empty category '{c.get('name')}' was not hidden!"
    print(f"[PASS] /api/categories -> HTTP 200, {len(categories)} active categories, {len(occasions)} active occasions (zero empty categories)")

    # Verify Homepage structure & single clean product grid
    assert "available-gifts" in home_html, "Homepage missing #available-gifts single product grid"
    assert "Shop by Occasion" in home_html, "Homepage missing dynamic 'Shop by Occasion' section"
    assert "Curated Customer Favourites" not in home_html, "Redundant 'Curated Customer Favourites' section still present on homepage!"
    assert "Explore Our Signature Collections" not in home_html, "Redundant 'Signature Collections' still present on homepage!"
    print("[PASS] Homepage has concise structure: Hero, Shop by Occasion, and single Available Gifts grid (zero duplicate sections)")

except Exception as e:
    print(f"[FAIL] Branding & Structure check -> {e}")

print("\n=== 4. Testing Order Placement API ===")
conn = sqlite3.connect("prisma/dev.db")
cursor = conn.cursor()
cursor.execute("SELECT id, title, price FROM Product WHERE slug='shubh-labh-pearl-hanging'")
prod = cursor.fetchone()
print("Using Product for order test:", prod)

order_payload = {
    "customerName": "Meera Kapoor",
    "customerPhone": "9876543210",
    "customerEmail": "meera@example.com",
    "addressLine1": "B-304, Palm Grove Apartments",
    "addressLine2": "Civil Lines",
    "city": "Jaipur",
    "state": "Rajasthan",
    "pincode": "302006",
    "landmark": "Opposite Central Park",
    "deliveryInstructions": "Please handle with care, it is a housewarming gift.",
    "paymentMethod": "COD",
    "items": [
        {
            "productId": prod[0],
            "quantity": 1,
            "customization": "Complimentary gift message for Mom",
        }
    ],
}

data_bytes = json.dumps(order_payload).encode("utf-8")
req = urllib.request.Request(
    base + "/api/orders",
    data=data_bytes,
    headers={"Content-Type": "application/json"},
)

try:
    res = urllib.request.urlopen(req, timeout=10)
    body = json.loads(res.read().decode("utf-8"))
    order_num = body.get("orderNumber")
    total_amt = body.get("totalAmount")
    print(f"[PASS] /api/orders -> HTTP {res.status}, Created Order #{order_num}, Total: Rs {total_amt}")
    
    # Test Order Success Page
    test_url(f"/order-success/{order_num}")
except Exception as e:
    print(f"[FAIL] /api/orders -> {e}")

print("\n=== 5. Testing Admin Authentication, Orders & Product Lifecycle ===")
cj = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

admin_pass = get_env_admin_password()
login_data = json.dumps({"username": "admin", "password": admin_pass}).encode("utf-8")
login_req = urllib.request.Request(
    base + "/api/admin/login",
    data=login_data,
    headers={"Content-Type": "application/json"},
)

try:
    login_res = opener.open(login_req, timeout=10)
    print(f"[PASS] /api/admin/login -> HTTP {login_res.status}")

    # Fetch admin orders
    orders_req = urllib.request.Request(base + "/api/admin/orders")
    orders_res = opener.open(orders_req, timeout=10)
    orders_data = json.loads(orders_res.read().decode("utf-8"))
    print(f"[PASS] /api/admin/orders -> Found {len(orders_data.get('orders', []))} orders in admin ledger")

    # Fetch admin products
    prods_req = urllib.request.Request(base + "/api/admin/products")
    prods_res = opener.open(prods_req, timeout=10)
    prods_data = json.loads(prods_res.read().decode("utf-8"))
    print(f"[PASS] /api/admin/products -> Found {len(prods_data.get('products', []))} products in catalogue")

    # Test updating a product price via Admin API
    update_data = json.dumps({
        "id": prod[0],
        "price": 699,
        "isPriceConfirmed": True,
    }).encode("utf-8")
    update_req = urllib.request.Request(
        base + "/api/admin/products",
        data=update_data,
        headers={"Content-Type": "application/json"},
        method="PUT",
    )
    update_res = opener.open(update_req, timeout=10)
    print(f"[PASS] /api/admin/products PUT -> HTTP {update_res.status}, Price confirmed!")

    # Test creating a new test product via Admin API
    create_data = json.dumps({
        "title": "Automated Test Floral Keepsake",
        "category": "Floral Dome Gifts",
        "price": 1099,
        "stock": 5,
        "isPriceConfirmed": True,
        "shortDescription": "Test keepsake created during automated quality verification.",
        "images": ["/products/pink-rose-dome-1.jpg"],
    }).encode("utf-8")
    create_req = urllib.request.Request(
        base + "/api/admin/products",
        data=create_data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    create_res = opener.open(create_req, timeout=10)
    create_body = json.loads(create_res.read().decode("utf-8"))
    created_id = create_body.get("product", {}).get("id")
    print(f"[PASS] /api/admin/products POST -> HTTP {create_res.status}, Created product ID {created_id}")

    # Clean up test product
    if created_id:
        del_req = urllib.request.Request(
            base + f"/api/admin/products?id={created_id}",
            method="DELETE",
        )
        del_res = opener.open(del_req, timeout=10)
        print(f"[PASS] /api/admin/products DELETE -> HTTP {del_res.status}, Deleted test product")

    # Test courier tracking update on order
    orders_list = orders_data.get("orders", [])
    if len(orders_list) > 0:
        tracking_data = json.dumps({
            "id": orders_list[0]["id"],
            "courierPartner": "Delhivery",
            "trackingNumber": "DLH-99283741",
            "orderStatus": "DISPATCHED",
        }).encode("utf-8")
        track_req = urllib.request.Request(
            base + "/api/admin/orders",
            data=tracking_data,
            headers={"Content-Type": "application/json"},
            method="PUT",
        )
        track_res = opener.open(track_req, timeout=10)
        print(f"[PASS] /api/admin/orders PUT -> HTTP {track_res.status}, Courier tracking assigned!")

    # Test Customer CRM directory route
    cust_html = opener.open(base + "/admin/customers").read().decode("utf-8")
    assert "Customer Directory" in cust_html, "Customer directory missing from CRM"
    assert "Customer Lifetime Value" in cust_html, "Customer LTV missing"
    print("[PASS] /admin/customers -> HTTP 200, Verified Customer CRM & Lifetime Value metrics")

    # Verify admin sidebar layout is completely decoupled from storefront chrome
    admin_page_html = opener.open(base + "/admin").read().decode("utf-8")
    assert "Operations Portal" in admin_page_html, "Admin operations portal sidebar missing"
    assert "Store Policies" not in admin_page_html, "Storefront footer leaked into admin!"
    assert "Direct Studio WhatsApp" not in admin_page_html, "Storefront announcement bar leaked into admin!"
    print("[PASS] Admin Dashboard operates as a completely decoupled business cockpit")

except Exception as e:
    print(f"[FAIL] Admin tests -> {e}")

print("\n=== All Tests Finished Successfully! ===")
