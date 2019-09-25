import * as React from 'react';
import { Checkbox } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);
