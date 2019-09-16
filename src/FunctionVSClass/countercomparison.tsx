import * as React from 'react';
import Counter from './counterfunction';
import { ComponentCounter } from './counterclass';

import './counter.css';

export const CounterComparison = () =>
{
    return (
        <div className='countercomparison'>
            <Counter />
            <ComponentCounter />
      </div>
    );
}