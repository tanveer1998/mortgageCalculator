import React, {useState} from 'react'
import { act } from 'react-dom/test-utils';


const Calculator = () => {
  const [state, setState] = useState()

  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  const [error, setError] = useState('');
 
  const handleInputChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value });
  }

  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
    }
    calculateResults(userValues);
  };

  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);
 
    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (monthly * calculatedPayments - userAmount).toFixed(2);
 
      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    // Validade if the values are positive numbers
    if (
      Number(amount) <= 0 ||
      Number(interest) <= 0 ||
      Number(years) <= 0
    ) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      console.log(actualError)
      return false;
    }
    return true;
  };

  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      years: '',
    });
 
    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  }; 

  return (
    <div className="p-3">
      <h1 className="text-center">Mortgage Calculator</h1>
      <p className="text-danger">{error}</p>
      <form onSubmit={handleSubmitValues}>
        <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-header">
                <h5>Calculate</h5>
              </div>
              <div className="card-body">
                <div>
                  <label>Mortgage Amount</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">$</span>
                    </div>
                    <input
                      type='text'
                      name='amount'
                      placeholder='Loan amount'
                      className="form-control"
                      value={userValues.amount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label>Interest</label>
                  <div className="input-group mb-3">
                    <input
                      type='text'
                      name='interest'
                      placeholder='Interest'
                      className="form-control"
                      value={userValues.interest}
                      onChange={handleInputChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon1">%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label>Years</label>
                  <input
                    type='text'
                    name='years'
                    placeholder='years'
                    className="form-control"
                    value={userValues.years}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group text-center mt-3">
                  <input
                    value='Clear'
                    type='button'
                    className="btn btn-secondary m-3"
                    onClick={clearFields}
                  />

                  <input type='submit' value="Calculate" className="btn btn-primary"/>
                </div>
              </div>
            </div>
          </div>
          {
            results.isResult 
            
            ? 
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-header">
                    <h5>Result</h5>
                  </div>
                  <div className="card-body">
                    <table className="table">
                      <tr>
                        <td>
                          Loan amount 
                        </td>
                        <td>
                          ${userValues.amount}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Interest
                        </td>
                        <td>
                          {userValues.interest}%
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Years to repay
                        </td>
                        <td>
                          {userValues.years}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Monthly Payment
                        </td>
                        <td>
                          $ {results.monthlyPayment}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Total Payment
                        </td>
                        <td>
                          $ {results.totalPayment}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Total Interest
                        </td>
                        <td>
                          $ {results.totalInterest}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            : 
            ''
          } 
        </div>
      </form>
    </div>
  )
}

export default Calculator