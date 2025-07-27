# sweets/management/commands/seed_sweets.py

from django.core.management.base import BaseCommand
import sys
import os

# Add the project root to the Python path so we can import seed.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))

class Command(BaseCommand):
    help = 'Seed the database with sample sweets data'

    def handle(self, *args, **options):
        try:
            # Import and run your existing seed.py
            import seed
            self.stdout.write(
                self.style.SUCCESS('Successfully seeded the database with sample sweets!')
            )
        except ImportError:
            self.stdout.write(
                self.style.ERROR('Could not import seed.py. Make sure it exists in your project root.')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error running seed script: {str(e)}')
            )