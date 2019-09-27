import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
    cardcontent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowdiv: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowelement: {
        margin: theme.spacing(1),
    }
});

export const useStyles = makeStyles(styles);

