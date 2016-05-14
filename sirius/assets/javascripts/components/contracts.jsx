import React from 'react';
import { fetchContracts } from '../actions/contracts';

export default class Contracts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: true
        }
    }

    componentDidMount() {
        this.context.store.subscribe(() => {
            const state = this.context.store.getState().contracts;
            this.setState({
                isFetching: state.get('isFetching'),
                contracts: state.get('items')
            });
        });
        this.context.store.dispatch(fetchContracts());
    }

    render() {
        return (
            <div className="project-contracts">
                <header className="page-header">
                    <h2 className="page-header">Contracts</h2>
                    <p>Manage contracts, invoices and other financial aspects of your project here.</p>
                </header>

                <a href="#" className="pure-button pure-button-primary">New Contract</a>

                <div className="contracts-list">
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
                </div>
            </div>
        )
    }

}

Contracts.contextTypes = {
    store: React.PropTypes.object
}