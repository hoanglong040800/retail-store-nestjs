// UT: mock typeorm-transactional
jest.mock('typeorm-transactional', () => ({
  Transactional: () => () => ({}),
  runOnTransactionCommit: () => () => ({}),
  runOnTransactionRollback: () => () => ({}),
  runOnTransactionComplete: () => () => ({}),
  initializeTransactionalContext: () => ({}), // seems to be required for testing
  Propagation: {
    REQUIRED: 'REQUIRED',
    REQUIRES_NEW: 'REQUIRES_NEW',
    SUPPORTS: 'SUPPORTS',
    MANDATORY: 'MANDATORY',
    NEVER: 'NEVER',
    NESTED: 'NESTED',
  },
}));
