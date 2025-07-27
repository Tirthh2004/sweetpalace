# seed.py
import mongoengine

# Connect to MongoDB Atlas
mongoengine.connect(
    db="sweetshop",
    host="mongodb+srv://tirthshah815:bnhmkKFGuUXjUUIw@cluster0.etacwrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

# Define Sweet model (MongoEngine version)
class Sweet(mongoengine.Document):
    name = mongoengine.StringField(required=True)
    price = mongoengine.FloatField(required=True)
    original_price = mongoengine.FloatField()
    category = mongoengine.StringField()
    rating = mongoengine.FloatField()
    reviews = mongoengine.IntField()
    description = mongoengine.StringField()
    image_url = mongoengine.StringField()
    quantity = mongoengine.IntField(default=0)
    in_stock = mongoengine.BooleanField(default=True)

# Clear existing data (optional)
Sweet.objects.delete()

# Sweet data
sweets_data = [
    {
        "name": "Gulab Jamun",
        "price": 250,
        "original_price": 300,
        "category": "Milk Based",
        "rating": 4.8,
        "reviews": 124,
        "description": "Soft, spongy balls soaked in aromatic sugar syrup. Made with fresh khoya and pure ghee.",
        "image_url": "https://yourcdn.com/gulab-jamun.jpg",
        "quantity": 100,
        "in_stock": True
    },
    {
        "name": "Motichoor Laddu",
        "price": 320,
        "category": "Festival Special",
        "rating": 4.7,
        "reviews": 89,
        "description": "Traditional round sweets made with fine gram flour pearls and pure ghee.",
        "image_url": "https://yourcdn.com/motichoor-laddu.jpg",
        "quantity": 100,
        "in_stock": True
    },
    {
        "name": "Kaju Katli",
        "price": 800,
        "original_price": 900,
        "category": "Dry Fruits",
        "rating": 4.9,
        "reviews": 156,
        "description": "Premium cashew diamond-shaped sweets with edible silver leaf.",
        "image_url": "https://yourcdn.com/kaju-katli.jpg",
        "quantity": 75,
        "in_stock": True
    },
    {
        "name": "Rasgulla",
        "price": 180,
        "category": "Bengali",
        "rating": 4.6,
        "reviews": 78,
        "description": "Soft cottage cheese balls in light sugar syrup, authentic Bengali recipe.",
        "image_url": "https://yourcdn.com/rasgulla.jpg",
        "quantity": 90,
        "in_stock": True
    },
    {
        "name": "Besan Laddu",
        "price": 280,
        "original_price": 320,
        "category": "Traditional",
        "rating": 4.5,
        "reviews": 95,
        "description": "Traditional gram flour laddus with almonds and cardamom.",
        "image_url": "https://yourcdn.com/besan-laddu.jpg",
        "quantity": 110,
        "in_stock": True
    },
    {
        "name": "Kaju Roll",
        "price": 650,
        "category": "Dry Fruits",
        "rating": 4.7,
        "reviews": 67,
        "description": "Cashew rolls filled with dates and dry fruits.",
        "image_url": "https://yourcdn.com/kaju-roll.jpg",
        "quantity": 60,
        "in_stock": False
    },
    {
        "name": "Ras Malai",
        "price": 300,
        "category": "Bengali",
        "rating": 4.8,
        "reviews": 112,
        "description": "Soft cottage cheese dumplings in sweetened milk with pistachios.",
        "image_url": "https://yourcdn.com/ras-malai.jpg",
        "quantity": 80,
        "in_stock": True
    },
    {
        "name": "Mixed Sweets Box",
        "price": 550,
        "original_price": 650,
        "category": "Gift Box",
        "rating": 4.9,
        "reviews": 234,
        "description": "Assorted traditional sweets perfect for gifting and celebrations.",
        "image_url": "https://yourcdn.com/mixed-sweets.jpg",
        "quantity": 150,
        "in_stock": True
    },
]

# Insert data
for sweet in sweets_data:
    Sweet(**sweet).save()

print("✅ Sweet data seeded successfully!")
