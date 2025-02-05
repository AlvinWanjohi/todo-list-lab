from app import app, db
from models import Newsletter

# Initialize app context
with app.app_context():
    print("Seeding database...")

    db.session.add_all([
        Newsletter(title="First Newsletter", body="This is the first newsletter."),
        Newsletter(title="Second Newsletter", body="This is the second newsletter."),
        Newsletter(title="Third Newsletter", body="This is the third newsletter."),
    ])

    db.session.commit()
    print("Seeding complete!")
