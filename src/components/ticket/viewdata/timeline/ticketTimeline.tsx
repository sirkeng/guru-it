import React from 'react';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';

interface TicketTimelineProps {
  ticketDetails: any;
  status: any;
}

const TicketTimeline: React.FC<TicketTimelineProps> = ({ ticketDetails, status }) => {
  return (
    <Timeline position="alternate">
      {/* Timeline Ticket Was Created */}
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {ticketDetails.ticket_create}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <Icon icon="mdi:file-document" />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6" component="span">
            Ticket Was Created
          </Typography>
          <Typography>
            Ticket #{ticketDetails.ticket_no} was created by {ticketDetails.customer_name}.
          </Typography>
        </TimelineContent>
      </TimelineItem>

      {/* Timeline Ticket Was Accepted */}
      {status >= 1 && (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {ticketDetails.ticket_accept}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="warning">
              <Icon icon="mdi:check-circle" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Ticket Was Accepted
            </Typography>
            <Typography>
              Ticket was accepted by {ticketDetails.user_firstname + ' ' + ticketDetails.user_lastname}.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      )}

      {/* Timeline Ticket Complete */}
      {status === 2 && (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {ticketDetails.ticket_complete}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="success">
              <Icon icon="mdi:check" />
            </TimelineDot>
            {/* No connector after the last item */}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Ticket Complete
            </Typography>
            <Typography>
              Ticket issue has been successfully resolved.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      )}
    </Timeline>
  )
}

export default TicketTimeline
