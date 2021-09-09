import AppLink from "../AppLink";
import getTrimmedTxHash from "../../utils/getTrimmedTxHash";
import getTokenAmount from "../../utils/getTokenAmount";
import { EXPLORER_URL } from "../../utils/config";

const makeL1ExplorerCSVLink = (account) => {
  return `"=HYPERLINK(""${EXPLORER_URL}address/${account.address}"",""${account.address}"")"`;
};

const makeCSVLink = (account) => {
  const loopringExplorerLink = `https://${window.location.host}/account/`;
  return `"=HYPERLINK(""${loopringExplorerLink}${account.id}"",""${account.address}"")"`;
};

const makeCSVTokenAmount = (amount, token) => {
  return `${getTokenAmount(amount, token.decimals).toFixed(4)} ${token.symbol}`;
};

export const getCSVTransactionDetailFields = (tx) => {
  switch (tx.__typename) {
    case "Add":
      return [
        makeCSVLink(tx.account),
        "",
        makeCSVTokenAmount(tx.amount, tx.token),
      ];
    case "Remove":
      return [
        "",
        makeCSVLink(tx.account),
        makeCSVTokenAmount(tx.amount, tx.token),
      ];
    case "Swap":
      return [makeCSVLink(tx.account), "", ""];
    case "OrderbookTrade":
      return [makeCSVLink(tx.accountA), makeCSVLink(tx.accountB), ""];
    case "Deposit":
      return [
        makeL1ExplorerCSVLink(tx.toAccount),
        makeCSVLink(tx.toAccount),
        makeCSVTokenAmount(tx.amount, tx.token),
      ];
    case "Withdrawal":
      return [
        makeCSVLink(tx.fromAccount),
        makeL1ExplorerCSVLink(tx.fromAccount),
        makeCSVTokenAmount(tx.amount, tx.token),
      ];
    case "Transfer":
      return [
        makeCSVLink(tx.fromAccount),
        makeCSVLink(tx.toAccount),
        makeCSVTokenAmount(tx.amount, tx.token),
      ];
    case "AccountUpdate":
      return [makeCSVLink(tx.user), "", ""];
    case "AmmUpdate":
      return ["", "", ""];
    case "SignatureVerification":
      return [makeCSVLink(tx.account), "", ""];
    default:
      return ["", "", ""];
  }
};

const TransactionTableDetails: React.FC<{ type: string; tx: any }> = ({
  type,
  tx,
}) => {
  switch (type) {
    case "Add":
      return (
        <>
          <td>
            <AppLink path="account" accountId={tx.account.id}>
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Remove":
      return (
        <>
          <td></td>
          <td>
            <AppLink path="account" accountId={tx.account.id}>
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Swap":
      return (
        <>
          <td>
            <AppLink path="account" accountId={tx.account.id}>
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td></td>
        </>
      );
    case "OrderbookTrade":
      return (
        <>
          <td>
            <AppLink path="account" accountId={tx.accountA.id}>
              {getTrimmedTxHash(tx.accountA.address, 7)}
            </AppLink>
          </td>
          <td>
            <AppLink path="account" accountId={tx.accountB.id}>
              {getTrimmedTxHash(tx.accountB.address, 7)}
            </AppLink>
          </td>
          <td></td>
        </>
      );
    case "Deposit":
      return (
        <>
          <td>
            <AppLink
              path="account"
              address={tx.toAccount.address}
              accountId={tx.toAccount.id}
              isExplorerLink
            >
              {getTrimmedTxHash(tx.toAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            <AppLink path="account" accountId={tx.toAccount.id}>
              {getTrimmedTxHash(tx.toAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Withdrawal":
      return (
        <>
          <td>
            <AppLink path="account" accountId={tx.fromAccount.id}>
              {getTrimmedTxHash(tx.fromAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            <AppLink
              path="account"
              address={tx.fromAccount.address}
              accountId={tx.fromAccount.id}
              isExplorerLink
            >
              {getTrimmedTxHash(tx.fromAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "Transfer":
      return (
        <>
          <td>
            <AppLink path="account" accountId={tx.fromAccount.id}>
              {getTrimmedTxHash(tx.fromAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            <AppLink path="account" accountId={tx.toAccount.id}>
              {getTrimmedTxHash(tx.toAccount.address, 7)}
            </AppLink>
          </td>
          <td>
            {getTokenAmount(tx.amount, tx.token.decimals).toFixed(4)}{" "}
            {tx.token.symbol}
          </td>
        </>
      );
    case "AccountUpdate":
      return (
        <>
          <td>
            <AppLink path="account" accountId={tx.user.id}>
              {getTrimmedTxHash(tx.user.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td></td>
        </>
      );
    case "AmmUpdate":
      return (
        <>
          <td></td>
          <td></td>
          <td></td>
        </>
      );
    case "SignatureVerification":
      return (
        <>
          <td>
            <AppLink path="account" accountId={tx.account.id}>
              {getTrimmedTxHash(tx.account.address, 7)}
            </AppLink>
          </td>
          <td></td>
          <td></td>
        </>
      );
    default:
      return null;
  }
};

export default TransactionTableDetails;
