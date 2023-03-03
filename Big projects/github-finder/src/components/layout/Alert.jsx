import { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

function Alert() {

    const { alert } = useContext(AlertContext);

    return alert !== null && (
        <p className='display-alert'>
            {alert.type === 'error' && (
                <svg
                    className='alert-svg'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <circle cx='12' cy='12' r='12' fill='#FECDD3'></circle>
                    <path
                        d='M8 8l8 8M16 8l-8 8'
                        stroke='#B91C1C'
                        strokeWidth='2'
                    ></path>
                </svg>
            )}
            <strong>
                {alert.message}
            </strong>
        </p>
    )
}

export default Alert
