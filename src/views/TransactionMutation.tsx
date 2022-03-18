import './TransactionMutation.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useAtom } from 'jotai';
import NumberFormat from 'react-number-format';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import Container from '../components/Container';
import BackArrowIcon from '../components/icons/BackArrow';
import { Input } from '../components/Input';
import { Maybe } from '../graphql.generated';
import { fetchReasonsAtom, reasonsAtom } from '../store/reason';
import XIcon from '../components/icons/X';
import DatePicker from '../components/DatePicker';
import ComboSelect from '../components/ComboSelect';
import {
  saveTransactionAtom,
  transactionsAtom,
  transactionSaveStatusAtom,
} from '../store/transaction';
import { appMessageAtom } from '../store/utils';
import { useAuth } from '../utils/useAuth';

const noop = () => null;

export default function TransactionMutation() {
  useAuth();

  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [saving, setSaving] = useAtom(transactionSaveStatusAtom);
  const setAppMessage = useUpdateAtom(appMessageAtom);
  const fetchReason = useUpdateAtom(fetchReasonsAtom);
  const saveTransaction = useUpdateAtom(saveTransactionAtom);
  const reasonList = useAtomValue(reasonsAtom);
  const transactions = useAtomValue(transactionsAtom);

  const [transactionId, setTransactionId] = useState<number | null | undefined>(null);
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Maybe<Date>>(null);
  const [reason, setReason] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (saving !== null) return;

    if (id && /\d+/i.test(id)) {
      const checkingId = Number(id);
      const transaction = transactions.find((t) => t.id === checkingId);

      if (transaction) {
        setAmount(String(transaction.amount));
        setDate(new Date(transaction.date));
        setReason(transaction.reason.text);
        setNote(transaction.note ?? '');
        setTransactionId(transaction.id);
        return;
      }
    }

    setTransactionId(null);
  }, [id, transactions]);

  const clear = () => {
    setErrors({});
    setAmount('');
    setDate(null);
    setReason('');
    setNote('');
  };

  const handleSave = async () => {
    if (saving === 'saving') return;

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
      await saveTransaction({
        id: transactionId,
        date: date?.toISOString(),
        amount: amount !== '' ? Number(amount) : null,
        reasonText: reason,
        note,
      });
    }
  };

  useEffect(() => {
    if (!reasonList?.length) {
      fetchReason();
    }
  }, [reasonList]);

  useEffect(() => {
    if (saving === 'saving' || saving === null) return;

    if (saving === 'success') {
      setAppMessage({
        message: `Tranaction has been ${transactionId === null ? 'created' : 'updated'}`,
        type: 'success',
        timeout: 3000,
      });
    }

    if (!transactionId) clear();

    setSaving(null);
  }, [saving]);

  return (
    <Container className="mutating">
      <div className="flex-row flex-center head">
        <h1 className="page-title">{transactionId === null ? 'Add' : 'Update'}</h1>
        <button className="button icon-button back-button" onClick={() => navigate('/')}>
          <BackArrowIcon />
        </button>
      </div>
      <div className="body">
        <div className="row" style={{ marginBottom: 4 }}>
          <Input
            error={errors['date']}
            caption="date"
            value={date ? DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL) : ''}
            onChange={noop}>
            <svg
              className="icon"
              style={{
                position: 'absolute',
                top: 23,
                left: 14,
                width: 22,
                height: 22,
                color: 'rgb(113, 113, 113, 0.8)',
              }}
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24">
              <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h1,-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"></path>
            </svg>
            {date && (
              <button
                className="button button-close"
                onClick={() => {
                  setErrors({});
                  setDate(null);
                }}
                style={{
                  color: 'rgb(113, 113, 113, 0.8)',
                  position: 'absolute',
                  right: 4,
                  left: 'initial',
                  top: 15,
                }}>
                <XIcon />
              </button>
            )}
          </Input>
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
            onValueChange={(values) => {
              const { value } = values;
              setErrors({});
              setAmount(value);
            }}>
            <span style={{ position: 'absolute', top: 25, left: 22 }}>$</span>
          </NumberFormat>
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
            caption="note"
            value={note}
            multiple
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
            if (saving) return;

            e.preventDefault();

            navigate('/');
          }}>
          Cancel
        </a>
        <button disabled={saving === 'saving'} onClick={handleSave}>
          Save Changes
        </button>
      </footer>
    </Container>
  );
}
