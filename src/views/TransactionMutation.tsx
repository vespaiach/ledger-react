import './TransactionMutation.css';
import '@vespaiach/horizontal-calendar/dist/calendar.css';
import '@vespaiach/horizontal-calendar/dist/defaultTheme.css';

import { useNavigate, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { ChangeEvent, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import Calendar from '@vespaiach/horizontal-calendar';

import Container from '../components/Container';
import { Input, TagInput } from '../components/Input';
import { Maybe, TransactionMap } from '../graphql.generated';
import { addReasonSelector, reasonsSelector, useReasonStore } from '../store/reason';
import {
  insertTransactionsSelector,
  transactionsSelector,
  updateTransactionSelector,
  useTransactionStore,
} from '../store/transaction';
import { useAuth } from '../utils/useAuth';
import { getTransaction$, saveTransaction$ } from '../dataSource';
import CloseIcon from '../components/icons/Close';
import { Button } from '../components/Button';
import CalendarIcon from '../components/icons/Calendar';
import NextArrowIcon from '../components/icons/NextArrow';
import InfoIcon from '../components/icons/Info';
import { addMessageSelector, useAppStore } from '../store/app';

const noop = () => null;

export default function TransactionMutation() {
  useAuth();

  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const reasonList = useReasonStore(reasonsSelector);
  const transactions = useTransactionStore(transactionsSelector);
  const updateTransaction = useTransactionStore(updateTransactionSelector);
  const insertTransaction = useTransactionStore(insertTransactionsSelector);
  const addReason = useReasonStore(addReasonSelector);
  const addMessage = useAppStore(addMessageSelector);

  const [reasonText, setReasonText] = useState('');
  const [loading, setLoading] = useState(id !== 'new');
  const [transactionId, setTransactionId] = useState<number | null | undefined>(null);
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<Maybe<Date>>(null);
  const [reasons, setReasons] = useState<{ text: string }[]>([]);
  const [note, setNote] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (!id || !/\d+/.test(id)) return;

    const update = (transaction: TransactionMap) => {
      setAmount(String(transaction.amount));
      setDate(new Date(transaction.date));
      setReasons(transaction.reasons);
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
    setReasons([]);
    setNote('');
  };

  const handleNewReason = () => {
    if (reasonText && reasonText.length > 2) {
      if (reasons.every((r) => r.text !== reasonText)) {
        setReasons([...reasons, { text: reasonText }]);
        addReason(reasonText);
      }
      setReasonText('');
      setErrors({});
    }
  };

  const handleChecked = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = evt.target;

    if (checked) {
      setReasons([...reasons, { text: value }]);
    } else {
      setReasons(reasons.filter((r) => r.text !== value));
    }
  };

  const handleSave = async () => {
    if (loading) return;

    const checking = { date: '', amount: '', reasons: '' };

    if (!date) {
      checking.date = 'please enter a date!';
    }

    if (!amount) {
      checking.amount = 'please enter an amount!';
    }

    if (!reasons || reasons.length === 0) {
      checking.reasons = 'please choose a reason or create one!';
    }

    if (Object.values(checking).some(Boolean)) {
      setErrors(checking);
    } else {
      saveTransaction$({
        id: transactionId,
        date,
        note,
        reasons: reasons.map((r) => r.text),
        amount: amount !== '' ? Number(amount) : null,
      }).subscribe({
        next: (tran) => {
          if (transactionId) {
            updateTransaction(tran);
          } else {
            insertTransaction(tran);
            clear();
          }
        },
        complete: () => {
          addMessage({ message: 'Saved transaction successfully!', type: 'success', timeout: 3000 });
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
        <Calendar
          selection={date}
          onChange={(value) => {
            setErrors({});
            setDate(value);
          }}
          rangeSelection={false}
          startAt={date || undefined}
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
          <Input
            error={errors['reasons']}
            caption="reasons"
            value={reasonText}
            className="mb-4"
            addIns={<InfoIcon />}
            subIns={
              reasonText ? (
                <Button boxLess onClick={handleNewReason}>
                  <NextArrowIcon />
                </Button>
              ) : null
            }
            onKeyUp={(e: { code: string }) => {
              if (e.code === 'Enter') {
                handleNewReason();
              }
            }}
            onChange={(e) => {
              setErrors({});
              setReasonText(e.currentTarget.value);
            }}
          />
          <TagInput
            caption=""
            tags={reasons}
            onDelete={(tag) => {
              setReasons(reasons.filter((r) => r.text !== tag.text));
            }}
          />
          <div className="checkboxes">
            {reasonList.map((reason) => (
              <label key={reason.text}>
                <input
                  type="checkbox"
                  checked={reasons.findIndex((r) => r.text === reason.text) > -1}
                  value={reason.text}
                  onChange={handleChecked}
                />
                <span>{reason.text}</span>
              </label>
            ))}
          </div>
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
          Back
        </a>
        <Button disabled={loading} onClick={handleSave}>
          Save Changes
        </Button>
      </footer>
    </Container>
  );
}
