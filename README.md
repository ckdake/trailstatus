# trailstatus
Simple app for responsible parties to keep trail statuses up to date

# Motivation
Currently, MTB ATlanta shares out trail status manually via tweets to https://twitter.com/mtbatltrails . These are embedded in a few places, and while it's straightforward, it has a few drawbacks:

1. Manually building a tweet carries some risk of not getting it right
1. The twitter account doesn't have any per-system permissions
1. There is no convinent way to automatically close/open trails based on conditions or time-since conditions
1. Popular trail sites like Trailforks convey a status different than the actual trail status

# MVP

A simple single page web application, behind authentication (login with Apple?) with status (open/closed) toggles for each trail system for MTB ATlanta, and a 'publish' button that tweets the trail status.

# Nice-to-haves

1. Publish "Bulk Trail Reports" to Trailforks when status is updated
1. Provide an unauthenticated https://jsonapi.org compliant API to provide status information to anyone that wants it
1. Provide a unique SMS number per trail system for a "Text for trail status" for signs at trailheads
1. Tooling to schedule trail status updates (e.g. "Reopen Trail System 24 hours from now at 8am"), and show this information in the JSON API and at Trailforks
1. Per-trail-system permissions so that different people can update different systems
1. Open-ended registration tied to Trailforks Region Admin permission so that any system manager can use this
