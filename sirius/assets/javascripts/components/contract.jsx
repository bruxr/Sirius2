import React from 'react';
import moment from 'moment';

export default class Contract extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="contract">
                <header className="contract-header">
                    <h3 className="contract-name">Theme Build</h3>
                    <div className="contract-desc">Lorem Ipsum asdkasdna</div>
                    <ul className="contract-meta">
                        <li>Worked for 2h 5m</li>
                        <li>Started 2d ago</li>
                        <li>Ended 1h ago</li>
                    </ul>
                </header>
                <table className="contract-table pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <th colSpan="4">Invoices</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="contract-invoice-row">
                            <th>Part 1</th>
                            <td>Paid</td>
                            <td>$250</td>
                            <td>$250</td>
                        </tr>
                        <tr className="contract-invoice-row">
                            <th>Part 2</th>
                            <td>Sent</td>
                            <td>$0</td>
                            <td>$250</td>
                        </tr>
                        <tr className="contract-invoice-row">
                            <th>Part 3 <a href="#" className="contract-invoice-action">Send</a></th>
                            <td>Saved</td>
                            <td>$0</td>
                            <td>$250</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>$250</td>
                            <td>$750</td>
                        </tr>
                    </tbody>
                </table>
                <ul className="contract-actions">
                    <li><a href="#" className="pure-button">Start Time</a></li>
                    <li><a href="#" className="pure-button-link">Edit</a></li>
                </ul>
            </div>
        )
    }

}

File.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    amount: React.PropTypes.number,
    time: React.PropTypes.number,
    allottedTime: React.PropTypes.number,
    rate: React.PropTypes.number,
    rateType: React.PropTypes.number,
    invoices: React.PropTypes.arrayOf(React.PropTypes.object),
    startedAt: React.PropTypes.instanceOf(moment),
    endedAt: React.PropTypes.instanceOf(moment)
}