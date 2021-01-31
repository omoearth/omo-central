import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Omo {
        # Omo's DID
        did:String
    }

    type Profile {
        # The did to which this profile is attached to
        # TODO: Is this always the same, even for different devices?
        #did:String
        # The fission username
        fissionName:ID!
        # The last known fission FS root CID
        fissionRoot:String
        # The address of the connected circles safe
        circlesAddress:String
        # The first name as entered for omosapien
        omoFirstName:String
        # The last name as entered for omosapien
        omoLastName:String
        # The CID of the omo avatar image
        omoAvatarCID:String
    }

    input UniqueProfileFields
    {
        #did: String
        fissionName: String
        circlesAddress:String
    }

    input ProfileQueryFields
    {
        #did: String
        fissionName: String
        omoFirstName:String
        omoLastName:String
        circlesAddress:String
    }

    input UpdateProfileFields
    {
        # The last known fission FS root CID or null
        fissionRoot:String
        # The address of the connected circles safe or null
        circlesAddress:String
        # The first name as entered for omosapien or null
        omoFirstName:String
        # The last name as entered for omosapien or null
        omoLastName:String
        # The CID of the omo avatar image or null
        omoAvatarCID:String
    }

    type Query
    {
        omo : Omo
        # Queries the directory for profiles that match one or more of the given field values.
        # All fields except "did" and "circlesAddress" are matched with 'startsWith'.
        profiles(fields:ProfileQueryFields) : Profile
        # Gets the root fs CID for a unique profile
        fissionRoot(fields:UniqueProfileFields) : String
    }

    type Mutation
    {
        updateProfile(jwt:String, data:UpdateProfileFields):Profile
    }

`;
