const PUSHGATEWAY_URL = process.env.PUSHGATEWAY_URL || "http://localhost:9091";


// Function to send metrics to the Pushgateway
export const pushMetricsToGateway = (
  jobName: String,
  metricName: String,
  value: number
) => {
  try {

    const data = `
# TYPE ${metricName} gauge
${metricName} ${value}
`;

    fetch(`${PUSHGATEWAY_URL}/metrics/job/${jobName}`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to push metrics to Pushgateway. Status: ${response.status}`
          );
        }
        console.log(`Successfully pushed metric: ${metricName}`);
      })
      .catch((error) => {
        console.error("Error pushing metrics:", error);
      });
  } catch (error) {
    console.error("Validation error:", error);
  }
};

// Example usage: Push metrics for a button click event
export const trackButtonClick = () => {
  pushMetricsToGateway("bookappfrontend", "react_button_click_count", 1);
};
