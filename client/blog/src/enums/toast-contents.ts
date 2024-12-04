
const DURATION = 5000;
export const toastContents = {
  general: {
    success: {
      title: "Success",
      duration: DURATION,
    }
  },
  auth: {
    unverified_email: {
      title: "Failed",
      description: "You have not verified email or the verification is expired. You're being redirected to the email verification step",
      duration: DURATION,
    }
  },
  user: {
    fail_to_create: {
      title: "Can not create users",
      description: "Some thing went wrong",
      duration: DURATION,
    }
  }
}