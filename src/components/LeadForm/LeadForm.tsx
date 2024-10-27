import { component$, useSignal, $ } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

export interface ModalProps {
  onClose$: QRL<() => void>;
}

export const Modal = component$<ModalProps>(({ onClose$ }) => {
  const firstName = useSignal('');
  const lastName = useSignal('');
  const email = useSignal('');
  const phoneNumber = useSignal('');
  const weddingDate = useSignal('');
  const weddingVenue = useSignal('');
  const message = useSignal('');
  const referralSource = useSignal('');

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      weddingDate: weddingDate.value,
      weddingVenue: weddingVenue.value,
      message: message.value,
      referralSource: referralSource.value,
    };

    // Send form data to Pipedream webhook
    const pipedreamWebhookUrl = 'https://eo61u3encsl1c2v.m.pipedream.net';
    await fetch(pipedreamWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    console.log('Form submitted', formData);
    onClose$();
  });

  return (
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-3xl bg-white">
        <button 
          onClick$={onClose$}
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Let's Talk</h3>
          <form class="mt-2 text-left" preventdefault:submit onSubmit$={handleSubmit}>
            <div class="mb-4 flex space-x-2">
              <div class="w-1/2">
                <label for="firstName" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={firstName.value} 
                  onInput$={(event) => firstName.value = (event.target as HTMLInputElement).value}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required
                />
              </div>
              <div class="w-1/2">
                <label for="lastName" class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={lastName.value} 
                  onInput$={(event) => lastName.value = (event.target as HTMLInputElement).value}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required
                />
              </div>
            </div>
            <div class="mb-4 flex space-x-2">
              <div class="w-1/2">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email.value} 
                  onInput$={(event) => email.value = (event.target as HTMLInputElement).value}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  required
                />
              </div>
              <div class="w-1/2">
                <label for="phoneNumber" class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={phoneNumber.value} 
                  onInput$={(event) => phoneNumber.value = (event.target as HTMLInputElement).value}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
            </div>
            <div class="mb-4 flex space-x-2">
              <div class="w-1/2">
                <label for="weddingDate" class="block text-gray-700 text-sm font-bold mb-2">Wedding Date</label>
                <input 
                  type="date" 
                  id="weddingDate" 
                  name="weddingDate" 
                  value={weddingDate.value} 
                  onInput$={(event) => weddingDate.value = (event.target as HTMLInputElement).value}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div class="w-1/2">
                <label for="weddingVenue" class="block text-gray-700 text-sm font-bold mb-2">Wedding Venue</label>
                <input 
                  type="text" 
                  id="weddingVenue" 
                  name="weddingVenue" 
                  value={weddingVenue.value} 
                  onInput$={(event) => weddingVenue.value = (event.target as HTMLInputElement).value}
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={message.value} 
                onInput$={(event) => message.value = (event.target as HTMLTextAreaElement).value}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                rows={4} 
              ></textarea>
            </div>
            <div class="mb-4">
              <label for="referralSource" class="block text-gray-700 text-sm font-bold mb-2">Referral Source</label>
              <input 
                type="text" 
                id="referralSource" 
                name="referralSource" 
                value={referralSource.value} 
                onInput$={(event) => referralSource.value = (event.target as HTMLInputElement).value}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              />
            </div>
            <div class="flex items-center justify-center mt-6">
              <button 
                type="submit" 
                class="bg-[#d5c6ad] hover:bg-[#c0b298] text-gray-800 font-bold py-2 px-6 rounded-full text-sm"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});
