from mongoengine import Document, StringField, FloatField, IntField, BooleanField, EmailField

class Sweet(Document):
    name = StringField(required=True)
    price = FloatField(required=True)
    original_price = FloatField()
    category = StringField()
    rating = FloatField()
    reviews = IntField()
    description = StringField()
    image_url = StringField()
    in_stock = BooleanField(default=True)
    quantity = IntField(default=0)

class User(Document):
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    name = StringField(required=True)
    phone = StringField(default="")  # Added phone field

    def set_password(self, raw_password):
        from django.contrib.auth.hashers import make_password
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.email

    @property
    def is_authenticated(self):
        return True 