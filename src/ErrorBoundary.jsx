import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // we have our initial state, we have getDerivedStates from prop, so now LifeCycle method here
  // the acutal error it caught, additional info that React will give you
  componentDidCatch(error, info) {
    // typically you want to send/log this to a TrackJS or Sentry.io or New Relic (some aggregation of error service)
    // "hey we're seeing errors here, ship it off to your error tracking software."
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }

    // if no error, we want to seamlessly pass through. Surround details route with error boundary - want details to render normally with no interference if no error.
    return this.props.children;
  }
}

export default ErrorBoundary;
