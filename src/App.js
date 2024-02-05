import React from 'react';
import './App.css';
import './StoryGenerator.css'; // Import CSS file for styling
import PlaceholderLoading from 'react-placeholder-loading'



class StoryGenerator extends React.Component {


  state = {
    storyParams: {
      "plots": "a short story ",
      "characters": "",
      "setting": "",
      "purpose": "part of  Story",
      "length": 200,
      "chapters": 1,
      "chapter_plot": "",
      "previous_chapter_summary": "",
      "main_story_summary": "",
      "climax_plot": "",
      "ending_plot": "",
      "genre": "",
      "theme": "",
      "point_of_view": "",
      "dialogue_balance": 20,
      "context": "",
      "story_tone": "",
      "language": "English",
      "model": "Butterfly",
      "parameters": {
        "model": "Butterfly",
        "temperature": 2,
        "temperature2": 0.7,
        "top_p": 1,
        "instructions": "",
        "writing_style": "The writing style is evocative and descriptive, creating tension and emotional anticipation.The narrative employs a blend of sensuality and tension, using dialogue and character introspection to convey the protagonist's experience.The narraion also detail the stripping process and the sexual assult part . The story unfolds with a focus on building visual scenes and emotional anticipation,ultimately leading to subdued revelations. The use of erotic and detailed descriptions adds emphasis and intensifies the emotional and visual impact of the narrative."
      },
      "rid": "urtlmtip2-2024",
      "dt": "0.1"

    },
    generatedStory: "",
    story_generating: false,
    archivedStory: [],
    Token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY5NjI5NzU5NmJiNWQ4N2NjOTc2Y2E2YmY0Mzc3NGE3YWE5OTMxMjkiLCJ0eXAiOiJKV1QifQ.eyJwcm92aWRlcl9pZCI6ImFub255bW91cyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS93ZWItdHRvb29scyIsImF1ZCI6IndlYi10dG9vb2xzIiwiYXV0aF90aW1lIjoxNzA3MDgyOTQwLCJ1c2VyX2lkIjoicXNEM0RLaFVjZ1U0SHBSYnJ6RWRNaFpLY2F6MSIsInN1YiI6InFzRDNES2hVY2dVNEhwUmJyekVkTWhaS2NhejEiLCJpYXQiOjE3MDcwODI5NDAsImV4cCI6MTcwNzA4NjU0MCwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6e30sInNpZ25faW5fcHJvdmlkZXIiOiJhbm9ueW1vdXMifX0.i2KcYsHuKZODoKUvG-J3f-z6E1u223Cma7xpZ_5o6iMrsMkRod8GLQ63GOPG17KHGg8RhAHtg1Pz-jop65w9ypdkdRBe9l_sVej0rfJXR_blZNLuuVjqFXhV3QUocmfZ8e7sazNtt6rTZWGDR0XGDQ6VaZj71y_SsUKickW9gvqI3RtD6VGjXaCLn0dV_gDhaCM2kbEsctznIQS8U8dO_0s_g1Q96ZPFeI79jug9GyYV69KjB2q-j-EcSkButAbYBt9meXy6iKCqW4y98pCr9wqKL7E-nEbTyF_Al4FiNlL9ORQFS40vKc3II8y30V3yUpe6gox4HWp-aF65EFda5A',
    App_check_token: 'eyJraWQiOiJYcEhKU0EiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOjM1ODcwMDM3NzU0Mjp3ZWI6OTAwZjM1ODE0NWE3YWEwNmQxM2VjNyIsImF1ZCI6WyJwcm9qZWN0c1wvMzU4NzAwMzc3NTQyIiwicHJvamVjdHNcL3dlYi10dG9vb2xzIl0sInByb3ZpZGVyIjoicmVjYXB0Y2hhX3YzIiwiaXNzIjoiaHR0cHM6XC9cL2ZpcmViYXNlYXBwY2hlY2suZ29vZ2xlYXBpcy5jb21cLzM1ODcwMDM3NzU0MiIsImV4cCI6MTcwNzE2OTM0NSwiaWF0IjoxNzA3MDgyOTQ1LCJqdGkiOiJYMWJVUWJDSW5vdEs5emVnSDdXVnlFaUdnT18zWkZlM2piMXF6RnJlem04In0.BdM5wSTSRT4Ku_guHENd9yiZ09kwu4kRjBwrEBoWOP3uZa-SMJqBRbEdwGuYsMXqmV3W3rYWxvRp187MmO328vazeVcNHjKaIdjpLxw5vI_P40uUfSPiQWEmzxg-8pGOWYyDGR-3pj9o65W3L7FYckTv9NOrMEIHW3-f2nqcEpwtPIyxAmYviMEsI6ON32T2DDVw1Jfo8atqf-DAvn2MgSOGAqTOpw2aeX2GLKO7HHbpnY6XPhmsXKxRUIoFwtncgDJ27MeURtJ386gRA0KhC0V3m-iOKb1CX1wlTjtXkFw9QYMSFxwM5V0srzbZiBqjD9AG4PPI50UDLF9ealz2ZgOj_nf6LQ97VioXqDurmVv6Z5uTVJUwroPi2lbQNriWP3SPoXL9juQYodOTAIrHjlQIvrA5HEFUuXbjntvr66UjMzIkyWflgkm-SN9Z0wgRs5aXtWUOsUeBch8hZcvBKsPH_zEOiVj-1vUQCgMI3VUVVXcD5geJuS222Buy4fI0'
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    // Automatically adjust textarea height
    if (event.target.tagName.toLowerCase() === 'textarea') {
      event.target.style.height = 'inherit'; // Reset height to recalculate
      event.target.style.height = `${event.target.scrollHeight}px`; // Set new height
    }

    this.setState(prevState => ({
      storyParams: {
        ...prevState.storyParams,
        [name]: value
      }
    }));
  };

  handleChange_parameters = (event) => {
    const { name, value } = event.target;

    // Automatically adjust textarea height


    this.setState(prevState => ({
      storyParams: {
        ...prevState.storyParams.parameters,
        [name]: value
      }
    }));
  };

  handleChange_generatedStory = (event) => {
    const { name, value } = event.target;

    // Automatically adjust textarea height


    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.setState({ story_generating: true , generatedStory: '' })
    this.initializeEventStream();

  };


  initializeEventStream = async () => {
    const raw = JSON.stringify(this.state.storyParams);
  
    let requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Connection': 'keep-alive',
        'Token': this.state.Token,
        'App_check_token': this.state.App_check_token
      },
      body: raw,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch("https://writing-7l47qrab3q-uc.a.run.app/story/story-generator", requestOptions);
      if (!response.body) {
        throw new Error('Response body is null');
      }
      const reader = response.body.getReader();
  
      // Function to read the stream
      const readStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          // Convert the Uint8Array to a string chunk
          const textChunk = new TextDecoder("utf-8").decode(value);
          let data = this.state.generatedStory + textChunk
          let cleanedStr = data.replace(/data: /g, '');

        // Then, replace all '[newline]' with an actual newline character '\n'
        cleanedStr = cleanedStr.replace(/\[newline\]/g, '\n');

        // Finally, replace all remaining newlines with a space to make it single line, except where '\n' is explicitly inserted
        cleanedStr = cleanedStr.replace(/\n+/g, ' ').trim();
        console.log('test', cleanedStr)
          // Update the state with each chunk, appending it to the existing story text
          this.setState(prevState => ({
            generatedStory: cleanedStr
          }));
        }
        // Once done, you can also update the state to reflect that loading is finished
        this.setState({ story_generating: false });
      };
  
      // Start reading the stream
      readStream();
    } catch (err) {
      console.error('Fetch error:', err);
      this.setState({
        story_generating: false
      });
    }
  }
  
  
  

   uint8arrayToStringMethod = (myUint8Arr)=>{
    return String.fromCharCode.apply(null, myUint8Arr);
 }


 
 
 


  readStream(reader) {
    console.log('***' ,reader);
    reader.then(
      (data) => {
        return data.text().read().then(({ done, value }) => {
          if (done) {
            return '';
          }
    
          // Assuming the data is text, you may need to handle different types of data accordingly
          const chunk = new TextDecoder('utf-8').decode(value);
    
          // Update state with the new data
          this.setState((prevState) => ({
            data: prevState.data + chunk,
          }));
    
          // Continue reading the stream
          return this.readStream(reader);
        });
      }
    )
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
   
  }

  render() {
    let { plots, characters, setting, instructions, writingStyle, length } = this.state.storyParams;
    let temperature = this.state.storyParams.parameters.temperature
    return (
      <div className="container">
        <h1>Story Generator</h1>
        <div className="form-row">
          <div className="input-group">
            <label>Plots</label>
            <textarea
              name="plots"
              value={plots}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group">
            <label>Characters</label>
            <textarea
              name="characters"
              value={characters}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Setting</label>
            <textarea
              name="setting"
              value={setting}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group">
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={instructions}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="input-group">
            <label>Writing Style</label>
            <textarea

              name="writingStyle"
              value={writingStyle}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group">
            <label>Temperature</label>
            <input
              type="range"
              name="temperature"
              min="0"
              max="1"
              step="0.01"
              value={temperature}
              onChange={this.handleChange_parameters}
            />
            <div className="range-value">{temperature}</div>
          </div>

          <div className="input-group">
            <label>Story length</label>
            <input
              type="range"
              name="length"
              min="100"
              max="1000"
              step="50"
              value={length}
              onChange={this.handleChange}
            />
            <div className="range-value">{length}</div>
          </div>
        </div>
        <button onClick={this.handleSubmit}>Generate Story</button>
        {this.state.story_generating && <PlaceholderLoading shape="rect" width={60} height={60} />}

        <div style={{ width: '100%' }}>
          <textarea
            name="generatedStory"
            value={this.state.generatedStory}
            onChange={this.handleChange_generatedStory}
            style={{ width: "100%", height: "1000px", fontSize: "25px" }}
          />


          <label>Token</label>

          <textarea
            name="Token"
            value={this.state.Token}
            onChange={this.handleChange_generatedStory}
            style={{ width: "100%"}}
          />
          <label>App_check_token</label>

          <textarea
            name="App_check_token"
            value={this.state.App_check_token}
            onChange={this.handleChange_generatedStory}
            style={{ width: "100%"}}
          />


        </div>
      </div>
    );
  }
}




export default StoryGenerator;



//export default StoryStreamComponent;
