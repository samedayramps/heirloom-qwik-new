import { component$, useSignal, $, type QRL, useTask$ } from '@builder.io/qwik';

// Form validation types
interface ValidationError {
  field: string;
  message: string;
}

interface FormState {
  isSubmitting: boolean;
  errors: ValidationError[];
  submitCount: number;
  lastSubmitTime: number;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  weddingDate: string;
  weddingVenue: string;
  message: string;
  referralSource: string;
}

export interface ModalProps {
  onClose$: QRL<() => void>;
}

// Form validation rules
const validateForm = (data: Record<string, string>): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Phone validation (optional but must be valid if provided)
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (data.phoneNumber && !phoneRegex.test(data.phoneNumber)) {
    errors.push({ field: 'phoneNumber', message: 'Please enter a valid phone number' });
  }

  // Required fields
  ['firstName', 'lastName', 'email'].forEach(field => {
    if (!data[field]) {
      errors.push({ field, message: 'This field is required' });
    }
  });

  // Wedding date validation
  if (data.weddingDate) {
    const weddingDate = new Date(data.weddingDate);
    const today = new Date();
    if (weddingDate < today) {
      errors.push({ field: 'weddingDate', message: 'Wedding date cannot be in the past' });
    }
  }

  return errors;
};

// Rate limiting configuration
const RATE_LIMIT = {
  maxSubmissions: 3,
  timeWindow: 5 * 60 * 1000, // 5 minutes
};

export const FormInput = component$<{
  id: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  onInput$: QRL<(event: Event) => void>;
  required?: boolean;
}>((props) => {
  return (
    <div class="w-1/2">
      <label for={props.id} class="block text-gray-700 text-sm font-bold mb-2">
        {props.label} {props.required && <span class="text-red-500">*</span>}
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        value={props.value}
        onInput$={props.onInput$}
        class={{
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline': true,
          'border-red-500': !!props.error
        }}
        required={props.required}
      />
      {props.error && (
        <p class="text-red-500 text-xs italic mt-1">{props.error}</p>
      )}
    </div>
  );
});

export const Modal = component$<ModalProps>(({ onClose$ }) => {
  const formData = {
    firstName: useSignal(''),
    lastName: useSignal(''),
    email: useSignal(''),
    phoneNumber: useSignal(''),
    weddingDate: useSignal(''),
    weddingVenue: useSignal(''),
    message: useSignal(''),
    referralSource: useSignal('')
  };

  const formState = useSignal<FormState>({
    isSubmitting: false,
    errors: [],
    submitCount: 0,
    lastSubmitTime: 0
  });

  const successMessage = useSignal('');

  // Replace useVisibleTask$ with useTask$
  useTask$(({ track }) => {
    track(() => formState.value.isSubmitting);
    if (typeof document !== 'undefined' && !formState.value.isSubmitting) {
      document.getElementById('firstName')?.focus();
    }
  });

  // Create input handlers for each field
  const inputHandlers = {
    firstName: $((event: Event) => {
      formData.firstName.value = (event.target as HTMLInputElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'firstName');
    }),
    lastName: $((event: Event) => {
      formData.lastName.value = (event.target as HTMLInputElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'lastName');
    }),
    email: $((event: Event) => {
      formData.email.value = (event.target as HTMLInputElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'email');
    }),
    phoneNumber: $((event: Event) => {
      formData.phoneNumber.value = (event.target as HTMLInputElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'phoneNumber');
    }),
    weddingDate: $((event: Event) => {
      formData.weddingDate.value = (event.target as HTMLInputElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'weddingDate');
    }),
    weddingVenue: $((event: Event) => {
      formData.weddingVenue.value = (event.target as HTMLInputElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'weddingVenue');
    }),
    message: $((event: Event) => {
      formData.message.value = (event.target as HTMLTextAreaElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'message');
    }),
    referralSource: $((event: Event) => {
      formData.referralSource.value = (event.target as HTMLInputElement).value;
      formState.value.errors = formState.value.errors.filter(error => error.field !== 'referralSource');
    })
  };

  const checkRateLimit = $(() => {
    const now = Date.now();
    if (now - formState.value.lastSubmitTime < RATE_LIMIT.timeWindow) {
      if (formState.value.submitCount >= RATE_LIMIT.maxSubmissions) {
        return false;
      }
    } else {
      // Reset counter if outside time window
      formState.value.submitCount = 0;
    }
    return true;
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    
    // Check rate limiting
    if (!(await checkRateLimit())) {
      formState.value.errors = [{
        field: 'form',
        message: 'Too many submissions. Please try again later.'
      }];
      return;
    }

    // Collect form data
    const submissionData = Object.entries(formData).reduce((acc, [key, signal]) => {
      acc[key] = signal.value;
      return acc;
    }, {} as Record<string, string>);

    // Validate form
    const validationErrors = validateForm(submissionData);
    if (validationErrors.length > 0) {
      formState.value.errors = validationErrors;
      return;
    }

    try {
      formState.value.isSubmitting = true;
      const response = await fetch('https://eo61u3encsl1c2v.m.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Update rate limiting state
      formState.value.submitCount++;
      formState.value.lastSubmitTime = Date.now();

      // Show success message
      successMessage.value = 'Thank you for your submission! We\'ll be in touch soon.';
      
      // Close modal after delay
      setTimeout(() => onClose$(), 2000);

    } catch (error) {
      formState.value.errors = [{
        field: 'form',
        message: 'Failed to submit form. Please try again.'
      }];
    } finally {
      formState.value.isSubmitting = false;
    }
  });

  return (
    <div 
      class="fixed inset-0 z-[100] overflow-y-auto"
      onClick$={(e) => {
        if ((e.target as HTMLElement).id === 'modal-backdrop') {
          onClose$();
        }
      }}
    >
      <div 
        id="modal-backdrop"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      />

      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative w-full max-w-md bg-white rounded-3xl shadow-xl">
          <button 
            onClick$={onClose$}
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            aria-label="Close"
            disabled={formState.value.isSubmitting}
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <div class="p-6">
            <h3 class="text-2xl text-center font-playfair mb-6">Let's Talk</h3>
            
            {/* Global error message */}
            {formState.value.errors.find(e => e.field === 'form') && (
              <div class="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {formState.value.errors.find(e => e.field === 'form')?.message}
              </div>
            )}

            {/* Success message */}
            {successMessage.value && (
              <div class="mb-4 p-3 bg-green-100 text-green-700 rounded">
                {successMessage.value}
              </div>
            )}

            <form class="space-y-4" preventdefault:submit onSubmit$={handleSubmit}>
              <div class="space-y-4">
                <div class="flex space-x-4">
                  <FormInput
                    id="firstName"
                    label="First Name"
                    type="text"
                    value={formData.firstName.value}
                    onInput$={inputHandlers.firstName}
                    error={formState.value.errors.find(e => e.field === 'firstName')?.message}
                    required
                  />
                  <FormInput
                    id="lastName"
                    label="Last Name"
                    type="text"
                    value={formData.lastName.value}
                    onInput$={inputHandlers.lastName}
                    error={formState.value.errors.find(e => e.field === 'lastName')?.message}
                    required
                  />
                </div>

                <div class="flex space-x-4">
                  <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    value={formData.email.value}
                    onInput$={inputHandlers.email}
                    error={formState.value.errors.find(e => e.field === 'email')?.message}
                    required
                  />
                  <FormInput
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    value={formData.phoneNumber.value}
                    onInput$={inputHandlers.phoneNumber}
                    error={formState.value.errors.find(e => e.field === 'phoneNumber')?.message}
                  />
                </div>

                <div class="flex space-x-4">
                  <FormInput
                    id="weddingDate"
                    label="Wedding Date"
                    type="date"
                    value={formData.weddingDate.value}
                    onInput$={inputHandlers.weddingDate}
                    error={formState.value.errors.find(e => e.field === 'weddingDate')?.message}
                  />
                  <FormInput
                    id="weddingVenue"
                    label="Wedding Venue"
                    type="text"
                    value={formData.weddingVenue.value}
                    onInput$={inputHandlers.weddingVenue}
                    error={formState.value.errors.find(e => e.field === 'weddingVenue')?.message}
                  />
                </div>

                <div class="w-full">
                  <label for="message" class="block text-gray-700 text-sm font-bold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message.value}
                    onInput$={inputHandlers.message}
                    class={{
                      'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline': true,
                      'border-red-500': !!formState.value.errors.find(e => e.field === 'message')
                    }}
                    rows={4}
                  />
                  {formState.value.errors.find(e => e.field === 'message')?.message && (
                    <p class="text-red-500 text-xs italic mt-1">
                      {formState.value.errors.find(e => e.field === 'message')?.message}
                    </p>
                  )}
                </div>

                <FormInput
                  id="referralSource"
                  label="How did you hear about us?"
                  type="text"
                  value={formData.referralSource.value}
                  onInput$={inputHandlers.referralSource}
                  error={formState.value.errors.find(e => e.field === 'referralSource')?.message}
                />
              </div>

              <div class="flex items-center justify-center mt-8">
                <button 
                  type="submit" 
                  class={{
                    'bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-bold py-3 px-8 rounded-full text-sm uppercase tracking-wider': true,
                    'opacity-50 cursor-not-allowed': formState.value.isSubmitting
                  }}
                  disabled={formState.value.isSubmitting}
                >
                  {formState.value.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
