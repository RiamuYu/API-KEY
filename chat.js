import readline from 'readline';
import fetch from 'node-fetch';

// Create interface for reading from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to make API call
async function askGPT(question) {
  try {
    const response = await fetch('https://my-api-sage-ten.vercel.app/api/gpt-vision', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",  // Changed from gpt-4-vision-preview since we're not using vision features
        messages: [
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 2000
      }),
    });

    const data = await response.json();
    
    // Check if there's an error in the API response
    if (data.error) {
      return `API Error: ${data.error.message || JSON.stringify(data.error)}`;
    }

    // Check if we have a valid response
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      return 'Received an unexpected response format from the API';
    }

  } catch (error) {
    return `Error: ${error.message}`;
  }
}

// Function to ask questions recursively
function askQuestion() {
  rl.question('\nEnter your question (or type "exit" to quit): ', async (question) => {
    if (question.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    console.log('\nThinking...');
    const answer = await askGPT(question);
    console.log('\nAnswer:', answer);
    
    // Ask another question
    askQuestion();
  });
}

// Start the conversation
console.log('Type "exit" to quit.');
askQuestion(); 