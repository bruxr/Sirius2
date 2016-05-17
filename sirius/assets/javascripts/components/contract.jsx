import React from 'react';
import moment from 'moment';

export default class Contract extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEditing: this.isNew()
        };
    }

    render() {
        let classes = ['contract'];
        let nameId = 'name-' + this.props.id;
        let descId = 'desc-' + this.props.id;
        let time = typeof this.props.time === 'undefined' ? 'Not started yet.' : `${this.props.time} minutes`;
        let started = typeof this.props.startedAt === 'undefined' ? '' : 'Started ' + this.props.startedAt.fromNow(true);
        let ended = typeof this.props.endedAt === 'undefined' ? '' : 'Started ' + this.props.startedAt.fromNow(true);
        let invoices = '';

        if (this.state.isEditing) {
            classes.push('editing');
        }

        if (this.props.invoices.length === 0) {
            invoices = <tr>
                <td colSpan="3" className="contract-empty-state empty-state">No invoices yet.</td>
            </tr>
        } else {
            invoices = this.props.invoices.map(invoice => {
                return <tr key={invoice.id} className="contract-invoice-row">
                    <th>{invoice.name}</th>
                    <td>Status</td>
                    <td>${invoice.amount}</td>
                </tr>
            });
        }

        return (
            <div className={classes.join(' ')}>
                <form className="pure-form pure-form-stacked">
                    <header className="contract-header">
                        <h3 className="contract-name">{this.props.name}</h3>
                        <div className="contract-desc">{this.props.description}</div>
                        <ul className="contract-meta">
                            <li>{time}</li>
                            <li>{started}</li>
                            <li>{ended}</li>
                        </ul>
                    </header>

                    <fieldset>
                        <label htmlFor={nameId}>Name</label>
                        <input type="text" id={nameId} data-key="name" autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor={descId}>Description</label>
                        <textarea id={descId} data-key="desc"></textarea>
                    </fieldset>

                    <table className="contract-table pure-table pure-table-horizontal">
                        <thead>
                            <tr>
                                <th colSpan="4">Invoices</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices}
                        </tbody>
                    </table>
                    <ul className="contract-actions">
                        <li><a href="#" className="pure-button">Start Time</a></li>
                        <li><a href="#" className="pure-button-link">Edit</a></li>
                    </ul>
                </form>
            </div>
        )
    }

    isNew() {
        return this.props.id < 0;
    }

    createEmptyInvoice() {
        let invoices = this.state.invoices;
        invoices.push([invoices.length, '', '']);
        this.setState({
            invoices
        });
    }

    addInvoice(e) {
        e.preventDefault();
        this.createEmptyInvoice();
    }

    updateTotal(e) {
        let invoicesTotal = 0;
        let amounts = document.getElementsByClassName('invoice-amount');
        for (let i = 0; i < amounts.length; i++) {
            let amt = parseInt(amounts[i].value);
            if (!isNaN(amt)) {
                invoicesTotal += amt;
            }
        }
        this.setState({
            invoicesTotal
        });
    }

}

File.propTypes = {
    id: React.PropTypes.number,
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