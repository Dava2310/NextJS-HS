export function RegisterForm() {
  return (
    <div className="login-card rounded-3xl bg-white">
      {/* Card Heading */}
      <h1 className="text-center text-3xl font-bold text-muted">Create an Account</h1>
      <p className="login-card-subtitle text-center text-lg font-semibold text-muted">
        Create an account to continue
      </p>

      {/* Inputs */}
      <div className="login-field">
        <label className="font-semibold text-lg" htmlFor="">
          Email address
        </label>
        <input className="login-input" type="text" placeholder="esteban_schiller@gmail.com" />
      </div>

      <div className="login-field">
        <label className="font-semibold text-lg" htmlFor="">
          Username
        </label>
        <input className="login-input" type="text" placeholder="Username" />
      </div>

      <div className="login-field">
        <div className="flex w-full flex-row items-center justify-between">
          <label className="font-semibold text-lg" htmlFor="">
            Password
          </label>
          <p className="text-muted-foreground text-lg">Forget Password?</p>
        </div>
        <input className="login-input" type="password" placeholder="******" />
        <label
          className="mt-(--login-password-options-margin-top) flex cursor-pointer flex-row items-center gap-2"
          htmlFor="register-accept-terms"
        >
          <input
            id="register-accept-terms"
            className="login-checkbox-input sr-only"
            type="checkbox"
          />
          <span className="login-checkbox-visual" aria-hidden="true" />
          <span className="font-semibold text-lg">I accept terms and conditions</span>
        </label>
      </div>

      {/* Buttons */}
      <div>
        <div className="flex w-full justify-center">
          <button
            type="button"
            className="login-signup-button flex items-center justify-center text-center text-xl font-bold text-white"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-(--login-signup-footer-margin-top) flex w-full flex-row flex-wrap items-center justify-center gap-x-1 text-lg text-muted-foreground">
          <span>Already have an account?</span>
          <span className="login-signup-footer-link text-lg font-bold">
            <a className="text-inherit" href="">
              Login
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
