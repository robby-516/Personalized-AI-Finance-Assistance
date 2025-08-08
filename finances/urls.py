# finances/urls.py
from django.urls import path
from . import views
from .views import financial_assistant_api

app_name = 'finances'

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('', views.home, name='home'),
    path('analysis/', views.financial_analysis_view, name='analysis'),
    # path('api/financial-data/', views.financial_data_api, name='financial_data_api'),

    # Income URLs
    path('add_income/', views.add_income, name='add_income'),
    path('edit_income/<int:income_id>/', views.edit_income, name='edit_income'),
    path('delete_income/<int:income_id>/', views.delete_income, name='delete_income'),

    # Expense URLs
    path('add_expense/', views.add_expense, name='add_expense'),
    path('edit_expense/<int:expense_id>/', views.edit_expense, name='edit_expense'),
    path('delete_expense/<int:expense_id>/', views.delete_expense, name='delete_expense'),
    path('export_expenses/', views.export_expenses, name='export_expenses'),
    path('upload-bill/', views.upload_bill, name='upload_bill'),
    path('api/financial-assistant/', views.financial_assistant_api, name='financial-assistant-api'),
    path('finances/api/financial-assistant/', views.financial_assistant_api), 


]
