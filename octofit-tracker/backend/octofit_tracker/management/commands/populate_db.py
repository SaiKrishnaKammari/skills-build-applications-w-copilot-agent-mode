from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data in correct order
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        for user in User.objects.all():
            user.delete()
        Workout.objects.all().delete()
        for team in Team.objects.all():
            team.delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Workouts
        pushups = Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='All')
        situps = Workout.objects.create(name='Situps', description='Do 30 situps', suggested_for='All')

        # Activities
        Activity.objects.create(user=tony, type='Run', duration=30, date=timezone.now().date())
        Activity.objects.create(user=steve, type='Swim', duration=45, date=timezone.now().date())
        Activity.objects.create(user=bruce, type='Cycle', duration=60, date=timezone.now().date())
        Activity.objects.create(user=clark, type='Yoga', duration=20, date=timezone.now().date())

        # Leaderboard
        Leaderboard.objects.create(user=tony, score=100)
        Leaderboard.objects.create(user=steve, score=90)
        Leaderboard.objects.create(user=bruce, score=95)
        Leaderboard.objects.create(user=clark, score=85)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
