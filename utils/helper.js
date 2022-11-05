/* eslint-disable no-case-declarations */

import { comparePosition } from '@/utils/common'
import { VIEW_BY } from '@/utils/constants'

export function sortUsers({ evaluationUsers, viewBy, authUserBranchId }) {
  let sortedUsers = []
  if (evaluationUsers && evaluationUsers.length) {
    switch (viewBy) {
      case VIEW_BY.company:
      case VIEW_BY.department:
      case VIEW_BY.area:
        const usersDataGroupByBranchId = sortDataByBranchId(
          evaluationUsers,
          authUserBranchId
        )
        // Sort by position in each branch
        sortedUsers = usersDataGroupByBranchId
          .map(users => users.sort(comparePosition('positionId')))
          .flat()
        break
      default:
        sortedUsers = evaluationUsers.sort(comparePosition('positionId'))
        break
    }
  }
  return sortedUsers
}

function sortDataByBranchId(evaluationUsers, authUserBranchId) {
  const branchIds = evaluationUsers
    .reduce((acc, user) => {
      if (!acc.includes(user.branchId)) acc.push(user.branchId)
      return acc
    }, [])
    .sort()
  const indexOfBranchId = branchIds.indexOf(authUserBranchId)

  if (indexOfBranchId > -1) {
    branchIds.splice(indexOfBranchId, 1)
    branchIds.unshift(authUserBranchId)
  }

  return branchIds.map(branchId =>
    evaluationUsers.filter(user => user.branchId === branchId)
  )
}
