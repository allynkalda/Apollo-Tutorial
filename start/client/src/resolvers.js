import gql from 'graphql-tag';

export const schema = gql`
  extend type Launch {
    isInCart: Boolean!
  }
`;

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }

  extend type Launch {
    isInCart: Boolean!
  }

  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [Launch]
  }
`;

export const resolvers = {
    Mutation: {
      addOrRemoveFromCart: (_, { id }, { cache }) => {
        const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
        const data = {
          cartItems: cartItems.includes(id)
            ? cartItems.filter(i => i !== id)
            : [...cartItems, id],
        };
        cache.writeQuery({ query: GET_CART_ITEMS, data });
        return data.cartItems;
      },
    },
  };