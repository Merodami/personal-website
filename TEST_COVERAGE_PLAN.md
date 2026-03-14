# Test Coverage Extension Plan

## Current Test Coverage

### Existing Tests
- ✅ `tests/unit/utils/theme.test.ts` - Theme utilities with edge cases (20 tests)
- ✅ `tests/unit/i18n/utils.test.ts` - i18n utilities (16 tests)
- ✅ `tests/unit/i18n/strategies/LanguageStrategyFactory.test.ts` - Language factory (6 tests)
- ✅ `tests/unit/i18n/strategies/EnglishStrategy.test.ts` - English strategy (3 tests)
- ✅ `tests/unit/i18n/strategies/SpanishStrategy.test.ts` - Spanish strategy (3 tests)
- ✅ `tests/integration/themePersistence.test.ts` - Theme persistence integration (2 tests)
- ✅ `tests/unit/utils/floatingLogos.test.ts` - Floating logos animation (12 tests)
- ✅ `tests/unit/components/ThemeToggle.test.ts` - Theme toggle component (10 tests)
- ✅ `tests/unit/stores/appStore.test.ts` - App store (Zustand) (11 tests)
- ✅ `tests/unit/utils/themeInit.test.ts` - Theme initialization script (12 tests)

**Total: 95 tests across 10 test files**

## Areas Needing Test Coverage

### ~~High Priority Components~~ ✅ COMPLETED
1. ~~**FloatingTechLogos Component** (`src/components/background/FloatingTechLogos.astro`)~~ ✅
   - ✅ Test mouse interaction animations
   - ✅ Test performance optimization (requestAnimationFrame)
   - ✅ Test logo positioning and transformations
   - ✅ Memory leak prevention and cleanup

2. ~~**ThemeToggle Component** (`src/components/layout/ThemeToggle.astro`)~~ ✅
   - ✅ Test toggle functionality
   - ✅ Test click handling
   - ✅ Test accessibility (ARIA labels, keyboard navigation)
   - ✅ Test initialization and DOM readiness

### ~~Medium Priority Files~~ ✅ COMPLETED
3. ~~**App Store** (`src/stores/appStore.ts`)~~ ✅
   - ✅ Test state management
   - ✅ Test store actions and mutations
   - ✅ Test store subscriptions

4. ~~**Theme Initialization** (`src/utils/themeInit.ts`)~~ ✅
   - ✅ Test initialization sequence
   - ✅ Test SSR compatibility
   - ✅ Test error handling

5. ~~**Theme Utilities - Edge Cases**~~ ✅
   - ✅ Test concurrent theme changes
   - ✅ Test invalid inputs
   - ✅ Test browser compatibility edge cases
   - ✅ Test memory leaks in event listeners
   - ✅ Test race conditions

### Visual Regression Tests
6. **Theme Transitions**
   - Test smooth color transitions
   - Test layout shift prevention
   - Test animation performance
   - Test cross-browser consistency

## Test Implementation Strategy

### 1. Component Testing for Astro Files
Since Astro components include client-side scripts, we'll need to:
- Extract JavaScript logic into separate testable modules
- Use @testing-library/dom for DOM interactions
- Mock browser APIs (requestAnimationFrame, etc.)

### 2. Performance Testing
- Measure animation frame rates
- Test memory usage during prolonged interactions
- Verify no memory leaks in event handlers

### 3. Integration Testing
- Test component interactions with stores
- Test theme persistence across page navigation
- Test SSR/CSR consistency

## Current Test Structure

```
tests/
├── unit/
│   ├── components/
│   │   └── ThemeToggle.test.ts ✅
│   ├── i18n/
│   │   ├── strategies/
│   │   │   ├── EnglishStrategy.test.ts ✅
│   │   │   ├── LanguageStrategyFactory.test.ts ✅
│   │   │   └── SpanishStrategy.test.ts ✅
│   │   └── utils.test.ts ✅
│   └── utils/
│       ├── floatingLogos.test.ts ✅
│       └── theme.test.ts ✅
└── integration/
    └── themePersistence.test.ts ✅
```

## Remaining Tests to Implement

```
tests/
├── unit/
│   ├── stores/
│   │   └── appStore.test.ts (pending)
│   └── utils/
│       └── themeInit.test.ts (pending)
├── integration/
│   └── componentStoreIntegration.test.ts (pending)
└── e2e/
    └── themeTransitions.test.ts (pending)
```

## Progress Summary

### ✅ Completed (Phase 1)
1. Converted all files to camelCase naming convention
2. Created comprehensive tests for FloatingTechLogos component
3. Created comprehensive tests for ThemeToggle component
4. Extracted testable logic from Astro components into separate modules

### ✅ Completed (Phase 2)
1. Created tests for appStore.ts (Zustand store)
2. Created tests for themeInit.ts
3. Added comprehensive edge case tests for theme utilities:
   - Concurrent theme changes
   - Invalid inputs handling
   - Browser compatibility (missing APIs)
   - Memory leak prevention
   - Race condition handling

### 📊 Test Coverage Summary
- **Total Tests**: 95
- **Test Files**: 10
- **Coverage Areas**:
  - UI Components (FloatingTechLogos, ThemeToggle)
  - State Management (appStore)
  - Utilities (theme, themeInit, floatingLogos)
  - Internationalization (i18n strategies and utils)
  - Integration tests (theme persistence)

### 🔄 Optional Future Enhancements
1. Create integration tests for component-store interactions
2. Add E2E tests for theme transitions
3. Add visual regression tests
4. Create tests for other components as they are developed