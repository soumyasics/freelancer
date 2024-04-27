import React from 'react'
import './forgot_password.css'
function Forgot_password() {
  return (
    <div className='user-forgot w-100'>
  <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-4">
          <div className="card mb-0 p-4">
            <div className="card-body">
              <h2 className="text-center user-forgot-heading mb-3">Forgot Password?</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label user-login-label">Old Password</label>
                  <input type="password" className="form-control" id="oldPassword" />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="form-label user-login-label">New Password</label>
                  <input type="password" className="form-control" id="newPassword" />
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <a className="user-login-label" href="">Sign In</a>
                  <a className="user-login-label" href="">Sign Up</a>
                </div>
                <button type="button" className="btn w-100 py-8 fs-4 mb-2 rounded-2 user-login-button text-white">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Forgot_password