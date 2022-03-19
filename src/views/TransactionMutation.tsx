import './TransactionMutation.css';

import { useNavigate, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import Container from '../components/Container';
import { ComboSelect, Input } from '../components/Input';
import { Maybe, TransactionMap } from '../graphql.generated';
import { reasonsSelector, useReasonStore } from '../store/reason';
import { transactionsSelector, updateTransactionSelector, useTransactionStore } from '../store/transaction';
import { useAuth } from '../utils/useAuth';
import { getTransaction$, saveTransaction$ } from '../dataSource';
import CloseIcon from '../components/icons/Close';
import { Button } from '../components/Button';
import DatePicker from '../components/DatePicker';
import CalendarIcon from '../components/icons/Calendar';

const noop = () => null;

export default function TransactionMutation() {
  useAuth();

  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const reasonList = useReasonStore(reasonsSelector);
  const transactions = useTransactionStore(transactionsSelector);
  const updateTransaction = useTransactionStore(updateTransactionSelector);

  const [loading, setLoading] = useState(id !== 'new');
  const [transactionId, setTransactionId] = useState<number | null | undefined>(null);
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Maybe<Date>>(null);
  const [reason, setReason] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id || !/\d+/.test(id)) return;

    const update = (transaction: TransactionMap) => {
      setAmount(String(transaction.amount));
      setDate(new Date(transaction.date));
      setReason(transaction.reason.text);
      setNote(transaction.note ?? '');
      setTransactionId(transaction.id);
    };

    const transaction = transactions.find((t) => t.id === Number(id));
    if (transaction) {
      update(transaction);
      setLoading(false);
    } else {
      getTransaction$(Number(id)).subscribe({
        next: (tran) => {
          tran && update(tran);
        },
        error: () => {
          setLoading(false);
        },
        complete: () => {
          setLoading(false);
        },
      });
    }
  }, [transactions, id]);

  const clear = () => {
    setErrors({});
    setAmount('');
    setDate(null);
    setReason('');
    setNote('');
  };

  const handleSave = async () => {
    if (loading) return;

    const checking = { date: '', amount: '', reason: '' };

    if (!date) {
      checking.date = 'please enter a date!';
    }

    if (!amount) {
      checking.amount = 'please enter an amount!';
    }

    if (!reason) {
      checking.reason = 'please choose or create a reason!';
    }

    if (Object.values(checking).some(Boolean)) {
      setErrors(checking);
    } else {
      saveTransaction$({
        id: transactionId,
        date,
        note,
        reasonText: reason,
        amount: amount !== '' ? Number(amount) : null,
      }).subscribe({
        next: (tran) => {
          if (transactionId) {
            updateTransaction(tran);
          } else {
            clear();
          }
        },
      });
    }
  };

  return (
    <Container className="mutating">
      <div className="flex-row flex-center head">
        <h1 className="page-title">{transactionId === null ? 'Add' : 'Update'}</h1>
        <Button className="back-button" boxLess onClick={() => navigate('/')}>
          <CloseIcon />
        </Button>
      </div>
      <div className="body">
        <div className="row" style={{ marginBottom: 4 }}>
          <Input
            error={errors['date']}
            caption="date"
            value={date ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL) : ''}
            addIns={<CalendarIcon />}
            subIns={
              date && (
                <Button
                  boxLess
                  onClick={() => {
                    setErrors({});
                    setDate(null);
                  }}>
                  <CloseIcon />
                </Button>
              )
            }
            onChange={noop}></Input>
        </div>
        <DatePicker
          onChange={(values) => {
            setErrors({});
            setDate(values[0]);
          }}
          fromDate={date}
        />
        <div className="row">
          <NumberFormat
            error={errors['amount']}
            maxLength={18}
            value={amount}
            caption="amount"
            customInput={Input}
            thousandSeparator={true}
            addIns={<span>$</span>}
            onValueChange={(values) => {
              const { value } = values;
              setErrors({});
              setAmount(value);
            }}
          />
        </div>
        <div className="row" style={{ marginTop: 18 }}>
          <ComboSelect
            error={errors['reason']}
            caption="reason"
            options={reasonList.map((r) => r.text)}
            value={reason}
            onChange={(val) => {
              setErrors({});
              setReason(val);
            }}
          />
        </div>
        <div className="row" style={{ marginBottom: 24 }}>
          <Input
            as="textarea"
            rows={4}
            caption="note"
            value={note}
            onChange={(val) => {
              setNote(val.target.value);
            }}
          />
        </div>
      </div>
      <footer className="form-footer">
        <a
          href="#"
          onClick={(e) => {
            if (loading) return;

            e.preventDefault();

            navigate('/');
          }}>
          Cancel
        </a>
        <Button disabled={loading} onClick={handleSave}>
          Save Changes
        </Button>
      </footer>
    </Container>
  );
}
