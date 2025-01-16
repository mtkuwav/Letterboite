export default () => `
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h3>Login</h3>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="token">Token</label>
                <input type="text" class="form-control" id="token" placeholder="Enter your token">
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
