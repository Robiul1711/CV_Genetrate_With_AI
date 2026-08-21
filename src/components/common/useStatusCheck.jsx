// Static mock data — will be replaced with API call when MERN backend is ready
export const useStatusCheck = () => {
  // Return mock data simulating an active subscription
  const mockData = {
    has_subscription: true,
    has_pay_per_download_credits: true,
    cover_letter: true,
    resume_downloads_remaining: 10,
    cover_letter_downloads_remaining: 5,
  };

  return {
    data: mockData,
    isLoading: false,
    isError: false,
    error: null,
  };
};
