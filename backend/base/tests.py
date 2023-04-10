from django.test import TestCase
from django.contrib.auth.models import User
from .models import Bookmark, Product, Profile

class BookmarkModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.product = Product.objects.create(name='Test Product', price=100)
        self.bookmark = Bookmark.objects.create(user=self.user, product=self.product)

    def test_bookmark_creation(self):
        self.assertEqual(self.bookmark.user, self.user)
        self.assertEqual(self.bookmark.product, self.product)
        self.assertFalse(self.bookmark.isBookmarked)
        self.assertIsNotNone(self.bookmark.bookmarkedAt)

    def test_bookmark_string_representation(self):
        expected_output = str(self.bookmark.bookmarkedAt)
        self.assertEqual(str(self.bookmark), expected_output)



class ProfileModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        user = User.objects.create(username='testuser')

        Profile.objects.create(
            user=user,
            bio='This is a test bio',
            telegram='my_telegram_id'
        )

    def test_telegram_id_contains_only_alphanumeric_and_underscore(self):
        profile = Profile.objects.get(id=1)
        telegram_id = profile.telegram

        for char in telegram_id:
            is_alphanumeric = char.isalnum()
            is_underscore = char == '_'
            self.assertTrue(is_alphanumeric or is_underscore)

    def test_telegram_id_has_minimum_length_of_four(self):
        profile = Profile.objects.get(id=1)
        telegram_id = profile.telegram

        self.assertGreaterEqual(len(telegram_id), 4)

    def test_profilepic_field_is_optional(self):
        profile = Profile.objects.get(id=1)
        field = profile._meta.get_field('profilepic')
        self.assertTrue(field.null)
        self.assertTrue(field.blank)

    def test_user_field_is_required(self):
        profile = Profile.objects.get(id=1)
        field = profile._meta.get_field('user')
        self.assertFalse(field.blank)

    def test_bio_field_is_optional(self):
        profile = Profile.objects.get(id=1)
        field = profile._meta.get_field('bio')
        self.assertTrue(field.null)
        self.assertTrue(field.blank)

    def test_telegram_field_max_length(self):
        profile = Profile.objects.get(id=1)
        field = profile._meta.get_field('telegram')
        self.assertEquals(field.max_length, 200)

    def test_user_related_name(self):
        profile = Profile.objects.get(id=1)
        related_name = profile.user.sellerProfile
        self.assertEquals(related_name, profile)
