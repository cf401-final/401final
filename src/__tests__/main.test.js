import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../App';

describe('Testing core behaviors of app', () => {
  it('Should properly render the application\'s initial components', async () => {
    render (
      <Provider store={store()}>
        <App />
      </Provider>
    );
  
    let header = screen.getByTestId('header');
    let mainContainer = screen.getByTestId('main-container');
    let leftSidebar = screen.getByTestId('left-sidebar');
    let signinBtn = screen.getByTestId('signin-btn');

    expect(header).toBeInTheDocument();
    expect(mainContainer).toBeInTheDocument();
    expect(leftSidebar).toBeInTheDocument();
    expect(signinBtn).toBeInTheDocument();
  });
});
