import * as React from 'react';
import { SVGProps } from 'react';

const HubSVG = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.75 0.5C5.30812 0.5 5.86077 0.60993 6.37641 0.823512C6.89204 1.03709 7.36056 1.35015 7.75521 1.7448C8.14986 2.13945 8.46291 2.60796 8.67649 3.1236C8.89007 3.63923 9 4.19188 9 4.75V9H4.75C3.62283 9 2.54183 8.55223 1.7448 7.7552C0.947768 6.95817 0.500002 5.87717 0.500002 4.75C0.500002 3.62283 0.947768 2.54183 1.7448 1.7448C2.54183 0.947767 3.62283 0.5 4.75 0.5V0.5ZM7 7V4.75C7 4.30499 6.86804 3.86998 6.62081 3.49997C6.37358 3.12996 6.02217 2.84157 5.61104 2.67127C5.19991 2.50097 4.74751 2.45642 4.31105 2.54323C3.87459 2.63005 3.47368 2.84434 3.15901 3.15901C2.84434 3.47368 2.63005 3.87459 2.54323 4.31105C2.45642 4.7475 2.50098 5.1999 2.67127 5.61104C2.84157 6.02217 3.12996 6.37357 3.49997 6.62081C3.86998 6.86804 4.30499 7 4.75 7H7ZM4.75 11H9V15.25C9 16.0906 8.75074 16.9123 8.28375 17.6112C7.81675 18.3101 7.15299 18.8548 6.37641 19.1765C5.59982 19.4982 4.74529 19.5823 3.92087 19.4183C3.09645 19.2543 2.33917 18.8496 1.7448 18.2552C1.15042 17.6608 0.745652 16.9036 0.581664 16.0791C0.417677 15.2547 0.501841 14.4002 0.823514 13.6236C1.14519 12.847 1.68992 12.1833 2.38883 11.7163C3.08774 11.2493 3.90943 11 4.75 11V11ZM4.75 13C4.30499 13 3.86998 13.132 3.49997 13.3792C3.12996 13.6264 2.84157 13.9778 2.67127 14.389C2.50098 14.8001 2.45642 15.2525 2.54323 15.689C2.63005 16.1254 2.84434 16.5263 3.15901 16.841C3.47368 17.1557 3.87459 17.3699 4.31105 17.4568C4.74751 17.5436 5.19991 17.499 5.61104 17.3287C6.02217 17.1584 6.37358 16.87 6.62081 16.5C6.86804 16.13 7 15.695 7 15.25V13H4.75ZM15.25 0.5C16.3772 0.5 17.4582 0.947767 18.2552 1.7448C19.0522 2.54183 19.5 3.62283 19.5 4.75C19.5 5.87717 19.0522 6.95817 18.2552 7.7552C17.4582 8.55223 16.3772 9 15.25 9H11V4.75C11 3.62283 11.4478 2.54183 12.2448 1.7448C13.0418 0.947767 14.1228 0.5 15.25 0.5V0.5ZM15.25 7C15.695 7 16.13 6.86804 16.5 6.62081C16.87 6.37357 17.1584 6.02217 17.3287 5.61104C17.499 5.1999 17.5436 4.7475 17.4568 4.31105C17.37 3.87459 17.1557 3.47368 16.841 3.15901C16.5263 2.84434 16.1254 2.63005 15.689 2.54323C15.2525 2.45642 14.8001 2.50097 14.389 2.67127C13.9778 2.84157 13.6264 3.12996 13.3792 3.49997C13.132 3.86998 13 4.30499 13 4.75V7H15.25ZM11 11H15.25C16.0906 11 16.9123 11.2493 17.6112 11.7163C18.3101 12.1833 18.8548 12.847 19.1765 13.6236C19.4982 14.4002 19.5823 15.2547 19.4183 16.0791C19.2544 16.9036 18.8496 17.6608 18.2552 18.2552C17.6608 18.8496 16.9036 19.2543 16.0791 19.4183C15.2547 19.5823 14.4002 19.4982 13.6236 19.1765C12.847 18.8548 12.1833 18.3101 11.7163 17.6112C11.2493 16.9123 11 16.0906 11 15.25V11ZM13 13V15.25C13 15.695 13.132 16.13 13.3792 16.5C13.6264 16.87 13.9778 17.1584 14.389 17.3287C14.8001 17.499 15.2525 17.5436 15.689 17.4568C16.1254 17.3699 16.5263 17.1557 16.841 16.841C17.1557 16.5263 17.37 16.1254 17.4568 15.689C17.5436 15.2525 17.499 14.8001 17.3287 14.389C17.1584 13.9778 16.87 13.6264 16.5 13.3792C16.13 13.132 15.695 13 15.25 13H13Z"
        fill="#E93D82"
      />
    </svg>
  );
};

export default HubSVG;
