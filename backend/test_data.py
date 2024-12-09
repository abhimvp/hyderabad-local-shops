# scripts/test_data.py
import asyncio
from datetime import datetime
from app.database.connection import connect_to_mongodb, get_database
from app.database.models.business import Business,Location,Address,Contact
from app.database.models.product import Price, Product

async def seed_test_data():
    await connect_to_mongodb()
    db = await get_database()
    
    # Business 1: Restaurant
    business1 = Business(
        businessName="Spice Paradise",
        shortName="SpiceP",
        category="Restaurant",
        subCategory="Traditional Hyderabadi",
        location=Location(type="Point", coordinates=[78.5575, 17.3484]),
        address=Address(
            street="Main Road",
            area="LB Nagar",
            city="Hyderabad",
            pincode="500074"
        ),
        contact=Contact(phone="+91-9876543210", email="spicep@email.com"),
        tags=["biryani", "haleem", "traditional"],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    # Business 2: Grocery Store
    business2 = Business(
        businessName="Fresh Daily Market",
        shortName="FreshD",
        category="Grocery",
        subCategory="Fresh Produce",
        location=Location(type="Point", coordinates=[78.5498, 17.3482]),
        address=Address(
            street="Green Avenue",
            area="Hayathnagar",
            city="Hyderabad",
            pincode="500070"
        ),
        contact=Contact(phone="+91-9876543211", whatsapp="+91-9876543211"),
        tags=["vegetables", "fruits", "organic", "fresh"],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    # Business 3: Pearl Shop
    business3 = Business(
        businessName="Pearl Paradise",
        shortName="PParadise",
        category="Jewelry",
        subCategory="Pearls",
        location=Location(type="Point", coordinates=[78.5513, 17.3495]),
        address=Address(
            street="Pearl Market Road",
            area="Dilsukhnagar",
            city="Hyderabad",
            pincode="500060"
        ),
        contact=Contact(phone="+91-9876543212", email="pearlp@email.com"),
        tags=["pearls", "jewelry", "premium"],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    # Business 4: Wellness Center
    business4 = Business(
        businessName="Ayur Wellness",
        shortName="AyurW",
        category="Wellness",
        subCategory="Ayurveda",
        location=Location(type="Point", coordinates=[78.5535, 17.3475]),
        address=Address(
            street="Health Street",
            area="Kothapet",
            city="Hyderabad",
            pincode="500035"
        ),
        contact=Contact(phone="+91-9876543213", whatsapp="+91-9876543213", email="ayur@email.com"),
        tags=["ayurveda", "wellness", "health", "organic"],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    # Business 5: Textile Shop
    business5 = Business(
        businessName="Silk Symphony",
        shortName="SilkS",
        category="Textile",
        subCategory="Traditional Wear",
        location=Location(type="Point", coordinates=[78.5545, 17.3465]),
        address=Address(
            street="Fashion Street",
            area="Vanasthalipuram",
            city="Hyderabad",
            pincode="500070"
        ),
        contact=Contact(phone="+91-9876543214", email="silks@email.com"),
        tags=["sarees", "traditional", "silk", "wedding"],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    # Insert businesses and store their IDs
    businesses = [business1, business2, business3, business4, business5]
    business_ids = []
    
    for business in businesses:
        business_dict = business.model_dump(exclude_unset=True, exclude={'_id'})
        result = await db.businesses.insert_one(business_dict)
        business_ids.append(str(result.inserted_id))
        print(f"Inserted business: {business.businessName} with id: {result.inserted_id}")

    # Products for Business 1 (Restaurant)
    products1 = [
        Product(
            businessId=business_ids[0],
            name="Special Hyderabadi Biryani",
            description="Traditional dum-cooked mutton biryani with premium basmati rice and tender meat",
            category="Main Course",
            price=Price(amount=350.00, unit="plate"),
            attributes={"spiceLevel": "medium", "servings": 2, "preparation": "dum", "type": "mutton"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[0],
            name="Haleem",
            description="Special Ramadan delicacy made with wheat, lentils, and tender meat",
            category="Seasonal",
            price=Price(amount=220.00, unit="plate"),
            attributes={"spiceLevel": "medium", "servings": 1, "seasonal": True, "availability": "Ramadan"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[0],
            name="Zafrani Chai",
            description="Premium saffron-infused traditional tea",
            category="Beverages",
            price=Price(amount=60.00, unit="cup"),
            attributes={"type": "hot", "servings": 1, "ingredients": ["saffron", "cardamom"], "specialty": True},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[0],
            name="Mutton Paya",
            description="Traditional soup made from lamb trotters",
            category="Breakfast",
            price=Price(amount=180.00, unit="bowl"),
            attributes={"spiceLevel": "high", "servings": 1, "bestTime": "morning", "style": "traditional"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[0],
            name="Double Ka Meetha",
            description="Classic Hyderabadi bread pudding dessert",
            category="Dessert",
            price=Price(amount=120.00, unit="portion"),
            attributes={"type": "sweet", "servings": 1, "style": "traditional", "containsNuts": True},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )
    ]

    # Products for Business 2 (Grocery)
    products2 = [
        Product(
            businessId=business_ids[1],
            name="Organic Tomatoes",
            description="Fresh farm tomatoes, locally sourced",
            category="Vegetables",
            price=Price(amount=40.00, unit="kg"),
            attributes={"organic": True, "source": "local farm", "freshness": "1 day", "season": "all"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[1],
            name="Green Apples",
            description="Premium imported green apples",
            category="Fruits",
            price=Price(amount=200.00, unit="kg"),
            attributes={"imported": True, "origin": "Washington", "storage": "refrigerated", "grade": "premium"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[1],
            name="Organic Brown Rice",
            description="Chemical-free brown rice from certified organic farms",
            category="Grains",
            price=Price(amount=120.00, unit="kg"),
            attributes={"organic": True, "type": "whole grain", "packaging": "eco-friendly", "shelf_life": "12 months"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[1],
            name="Farm Fresh Eggs",
            description="Free-range chicken eggs from local farms",
            category="Dairy & Eggs",
            price=Price(amount=90.00, unit="dozen"),
            attributes={"type": "free-range", "size": "large", "farm_source": "local", "freshness": "3 days"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[1],
            name="Organic Honey",
            description="Pure, unprocessed honey from local beekeepers",
            category="Natural Products",
            price=Price(amount=450.00, unit="500g"),
            attributes={"organic": True, "type": "raw", "source": "local", "processing": "none"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )
    ]

    # Products for Business 3 (Pearl Shop)
    products3 = [
        Product(
            businessId=business_ids[2],
            name="South Sea Pearl Necklace",
            description="Premium white south sea pearl necklace with 18K gold clasp",
            category="Necklaces",
            price=Price(amount=25000.00, unit="piece"),
            attributes={"pearlType": "South Sea", "color": "White", "length": "18 inches", "clasp": "18K Gold"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[2],
            name="Pearl Stud Earrings",
            description="Classic Akoya pearl studs with diamond accents",
            category="Earrings",
            price=Price(amount=8000.00, unit="pair"),
            attributes={"pearlType": "Akoya", "color": "Cream", "size": "8mm", "setting": "18K White Gold"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[2],
            name="Pearl Bracelet",
            description="Multi-strand freshwater pearl bracelet",
            category="Bracelets",
            price=Price(amount=12000.00, unit="piece"),
            attributes={"pearlType": "Freshwater", "color": "Multi", "length": "7.5 inches", "strands": 3},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[2],
            name="Tahitian Pearl Ring",
            description="Black Tahitian pearl ring with diamond pavé",
            category="Rings",
            price=Price(amount=15000.00, unit="piece"),
            attributes={"pearlType": "Tahitian", "color": "Black", "size": "7", "metalType": "Platinum"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[2],
            name="Pearl Pendant",
            description="Golden South Sea pearl pendant with diamond halo",
            category="Pendants",
            price=Price(amount=18000.00, unit="piece"),
            attributes={"pearlType": "Golden South Sea", "color": "Golden", "size": "11mm", "chain": "included"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )
    ]

    # Products for Business 4 (Wellness)
    products4 = [
        Product(
            businessId=business_ids[3],
            name="Abhyanga Massage",
            description="Traditional full body ayurvedic massage with medicated oils",
            category="Services",
            price=Price(amount=2000.00, unit="session"),
            attributes={"duration": "60 mins", "type": "Abhyanga", "includes": "steam", "oils": "customized"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[3],
            name="Immunity Booster Package",
            description="30-day herbal immunity boosting supplements",
            category="Products",
            price=Price(amount=1200.00, unit="pack"),
            attributes={"duration": "30 days", "type": "Herbal", "form": "Tablets", "ingredients": "natural"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[3],
            name="Shirodhara Treatment",
            description="Stress-relieving therapeutic oil treatment for head",
            category="Services",
            price=Price(amount=2500.00, unit="session"),
            attributes={"duration": "45 mins", "type": "Therapeutic", "benefits": ["stress relief", "mental clarity"]},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[3],
            name="Herbal Hair Oil",
            description="Traditional ayurvedic hair growth oil",
            category="Products",
            price=Price(amount=450.00, unit="200ml"),
            attributes={"type": "Hair Care", "ingredients": "herbal", "benefits": ["growth", "strengthening"]},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[3],
            name="Panchakarma Package",
            description="Complete detoxification and rejuvenation program",
            category="Services",
            price=Price(amount=15000.00, unit="package"),
            attributes={"duration": "7 days", "type": "Detox", "includes": ["consultation", "treatments", "medicines"]},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )
    ]

    # Products for Business 5 (Textile)
    products5 = [
        Product(
            businessId=business_ids[4],
            name="Kanjeevaram Silk Saree",
            description="Pure silk wedding saree with rich zari work",
            category="Sarees",
            price=Price(amount=15000.00, unit="piece"),
            attributes={"material": "Pure Silk", "color": "Red", "occasion": "Wedding", "zari": "Real Gold"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[4],
            name="Designer Blouse",
            description="Hand-embroidered designer blouse with mirror work",
            category="Blouses",
            price=Price(amount=3000.00, unit="piece"),
            attributes={"material": "Raw Silk", "work": "Zardozi", "size": "Medium", "style": "Back Design"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[4],
            name="Banarasi Lehenga",
            description="Bridal Banarasi silk lehenga with heavy embroidery",
            category="Lehengas",
            price=Price(amount=25000.00, unit="set"),
            attributes={"material": "Banarasi Silk", "pieces": 3, "occasion": "Bridal", "work": "Zardozi"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[4],
            name="Pochampally Ikat Saree",
            description="Handloom Pochampally Ikat saree with geometric patterns",
            category="Sarees",
            price=Price(amount=5000.00, unit="piece"),
            attributes={"material": "Cotton Silk", "style": "Ikat", "weave": "Handloom", "origin": "Pochampally"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        ),
        Product(
            businessId=business_ids[4],
            name="Silk Dupatta",
            description="Pure silk dupatta with traditional temple border",
            category="Dupattas",
            price=Price(amount=2500.00, unit="piece"),
            attributes={"material": "Pure Silk", "border": "Temple", "length": "2.5 meters", "work": "Zari"},
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )
    ]

    # Insert all products
    all_products = products1 + products2 + products3 + products4 + products5
    for product in all_products:
        product_dict = product.model_dump(exclude_unset=True, exclude={'_id'})
        result = await db.products.insert_one(product_dict)
        print(f"Inserted product: {product.name} with id: {result.inserted_id}")

if __name__ == "__main__":
    asyncio.run(seed_test_data())