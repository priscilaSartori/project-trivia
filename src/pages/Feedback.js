import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const Mínimo = 3;
    return (
      <div>
        <Header />
        {
          (assertions < Mínimo ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>)
        }
        <p>Feedback</p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ playerReducer }) => ({
  assertions: playerReducer.assertions,
});

export default connect(mapStateToProps)(Feedback);
