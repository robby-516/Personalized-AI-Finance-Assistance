# finances/forms.py

from django import forms
from .models import Income, Expense,BillUpload
from django.forms import ModelForm

class IncomeForm(ModelForm):
    class Meta:
        model = Income
        fields = ['amount', 'description', 'date', 'category', 'is_recurring', 'frequency', 'day_of_month']

        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),  # This makes the date field a date picker
            'description': forms.Textarea(attrs={'rows': 3}),
        }

    def clean(self):
        cleaned_data = super().clean()
        is_recurring = cleaned_data.get('is_recurring')
        frequency = cleaned_data.get('frequency')
        day_of_month = cleaned_data.get('day_of_month')

        if is_recurring and not frequency:
            raise forms.ValidationError("Please select a frequency for recurring income.")
        if frequency == 'monthly' and not day_of_month:
            raise forms.ValidationError("Please specify the day of the month for monthly recurring.")
        return cleaned_data

class ExpenseForm(ModelForm):
    class Meta:
        model = Expense
        fields = ['amount', 'description', 'date','category', 'is_recurring', 'frequency', 'day_of_month']

        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),  # This makes the date field a date picker
            'description': forms.Textarea(attrs={'rows': 3}),
        }

    def clean(self):
        cleaned_data = super().clean()
        is_recurring = cleaned_data.get('is_recurring')
        frequency = cleaned_data.get('frequency')
        day_of_month = cleaned_data.get('day_of_month')

        if is_recurring and not frequency:
            raise forms.ValidationError("Please select a frequency for recurring expense.")
        if frequency == 'monthly' and not day_of_month:
            raise forms.ValidationError("Please specify the day of the month for monthly recurring.")
        return cleaned_data

class BillUploadForm(forms.ModelForm):
    class Meta:
        model = BillUpload
        fields = ['file']
        widgets = {
            'file': forms.FileInput(attrs={'accept': 'image/*'}) 
        }

class FinancialAnalysisForm(forms.Form):
    PERIOD_CHOICES = [
        ('all', 'All Time'),
        ('month', 'Current Month'),
        ('year', 'Current Year'),
    ]
    
    ANALYSIS_CHOICES = [
        ('overview', 'Financial Overview'),
        ('spending', 'Spending Analysis'),
        ('saving', 'Saving Opportunities'),
        ('trends', 'Financial Trends'),
    ]
    
    period = forms.ChoiceField(choices=PERIOD_CHOICES, required=False)
    analysis_type = forms.ChoiceField(choices=ANALYSIS_CHOICES, required=False)

# forms.py (optional - custom form)
from django import forms
from django.contrib.auth.forms import PasswordResetForm as BasePasswordResetForm
from django.contrib.auth.models import User

class CustomPasswordResetForm(BasePasswordResetForm):
    """Custom password reset form with enhanced styling"""
    
    email = forms.EmailField(
        max_length=254,
        widget=forms.EmailInput(attrs={
            'class': 'form-input',
            'placeholder': 'Enter your email address',
            'required': True
        })
    )
    
    def clean_email(self):
        email = self.cleaned_data['email']
        if not User.objects.filter(email=email).exists():
            # Don't reveal if email exists for security reasons
            pass
        return email