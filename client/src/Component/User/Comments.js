import  React from 'react';
import CommentsBlock from 'simple-react-comments';
// import { commentsData } from './data/index'; // Some comment data
 
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [{"commentsData":"hghgfhg"}],
    };
  }
  commentsData = [{
    authorUrl: '#',
    avatarUrl:
      'https://cdnb.artstation.com/p/users/avatars/000/126/159/large/582fd86d44a71299b5cc51fe9f580471.jpg?1447075438',
    createdAt: new Date(),
    createdAt: new Date(1530297561680),
    fullName: 'Alexey Ryabov',
    text: '<h1>hello whats up</h1>',
  },
  {
    authorUrl: '/asdf',
    avatarUrl:
      'https://cdnb.artstation.com/p/users/avatars/000/126/159/large/582fd86d44a71299b5cc51fe9f580471.jpg?1447075438',
    createdAt: new Date(),
    createdAt: new Date(1530297561680),
    fullName: 'Alexey Ryabov',
    text: 'reactomments is awesome!',
  }]
  render() {
    return (
      <div>
        <CommentsBlock
          comments={this.commentsData}
        //   signinUrl={'/signin'}
         isLoggedIn={true}
        //   reactRouter={true} // set to true if you are using react-router
          onSubmit={text => {
            if (text.length > 0) {
              this.setState({
                comments: [
                  ...this.state.comments,
                  {
                    authorUrl: '#',
                    avatarUrl: '#avatarUrl',
                    createdAt: new Date(),
                    fullName: 'Name',
                    text,
                  },
                ],
              });
              console.log('submit:', text);
            }
          }}
        />
      </div>
    );
  }
}
 
export default Comments;