import { useCallback } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithCache, loading } = useCustomFetch() // changed from fetchWithoutCache to fetchWithCache

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithCache<void, SetTransactionApprovalParams>("setTransactionApproval", { // changed from fetchWithoutCache to fetchWithCache
        transactionId,
        value: newValue,
      })
    },
    [fetchWithCache] // changed from fetchWithoutCache to fetchWithCache
  )

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }


  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <TransactionPane
          key={transaction.id}
          transaction={transaction}
          loading={loading}
          setTransactionApproval={setTransactionApproval}
        />
      ))}
    </div>
  )
}
