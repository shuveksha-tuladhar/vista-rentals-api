# Become a Host - Listing Creation Flow

A multi-step form interface for hosts to create property listings on Vista Rentals, inspired by Airbnb's clean design.

## Features

### 🎨 Clean Design
- Simplified navbar without search functionality
- Consistent styling with the main application
- Responsive design for mobile and desktop

### 📝 7-Step Process

1. **Property Type** - Select from House, Apartment, Villa, or Condo
2. **Location** - Enter complete address details
3. **Basics** - Set number of guests, bedrooms, beds, and bathrooms
4. **Amenities** - Choose from popular amenities (WiFi, TV, Kitchen, etc.)
5. **Photos** - Upload at least 5 photos with drag-and-drop support
6. **Description** - Add title and detailed description
7. **Pricing** - Set nightly price with guest breakdown

### ✨ User Experience

- **Progress Tracking** - Visual stepper shows current progress
- **Validation** - Real-time validation with helpful error messages
- **Auto-save Ready** - State management prepared for auto-save functionality
- **Navigation** - Easy back/next navigation between steps
- **Exit Option** - Quick exit button returns to main site

## Components Structure

```
BecomeAHost/
├── BecomeAHost.tsx           # Main container with state management
├── components/
│   ├── HostNavbar.tsx        # Clean navbar for host flow
│   └── Stepper.tsx           # Progress indicator component
└── steps/
    ├── PropertyTypeStep.tsx  # Step 1: Property type selection
    ├── LocationStep.tsx      # Step 2: Address form
    ├── BasicsStep.tsx        # Step 3: Guests/beds/baths
    ├── AmenitiesStep.tsx     # Step 4: Amenities selection
    ├── PhotosStep.tsx        # Step 5: Photo upload
    ├── DescriptionStep.tsx   # Step 6: Title & description
    └── PricingStep.tsx       # Step 7: Pricing
```

## Usage

Navigate to `/become-a-host` or click "Become a Host" from the main navigation menu.

## State Management

The component maintains a complete `ListingData` object that includes:
- Property type
- Full address
- Basic information (guests, beds, bathrooms)
- Selected amenities
- Uploaded photos (as base64 strings)
- Title and description
- Price per night

## Validation Rules

- **Step 1**: Property type must be selected
- **Step 2**: All address fields are required
- **Step 3**: Minimum 1 for all counts
- **Step 4**: At least one amenity required
- **Step 5**: Minimum 5 photos required
- **Step 6**: Both title and description required
- **Step 7**: Price must be greater than 0

## API Integration (Ready)

The submit handler is prepared for API integration. Update the `handleSubmit` function in [BecomeAHost.tsx](BecomeAHost.tsx#L149) to send data to your backend:

```typescript
const handleSubmit = async () => {
  // Add your API call here
  const response = await postApi('/properties', listingData);
  // Handle response
};
```

## Future Enhancements

- [ ] Auto-save functionality
- [ ] Draft saving
- [ ] Image optimization and cloud upload
- [ ] Map integration for location
- [ ] Calendar availability
- [ ] House rules editor
- [ ] Cancellation policy selection
- [ ] Preview mode before publishing
