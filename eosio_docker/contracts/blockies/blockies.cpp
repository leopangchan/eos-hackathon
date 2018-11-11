#include <eosiolib/eosio.hpp>

using namespace eosio;
using namespace std;

//
// API use cases

// PHASE I
// 1. Publisher: Recording intent data
// 2. User: Taking over their ID and claiming it as an EOS user ID
// 3. User: Fetching all data that's stored about me
// 4. User: Deleting a record that's stored about me
// 5. Publisher: Fetching all data that I have stored about my users

// PHASE II
// 6. Data user / advertiser: Bidding on a specific intent filter, in a specific time frame, with maximum pay per user and maximum # of users (impressions_

class [[eosio::contract]] blockies : public eosio::contract {
  public:
    using contract::contract;

    blockies( name receiver, name code, datastream<const char*> ds ):
                contract( receiver, code, ds ),
                _intents( receiver, receiver.value ),
                _users( receiver, receiver.value ) {}

    // ********************
    // PUBLISHER-FACING API
    // ********************
    
    // Record a user intent with up to 3 hierarchy levels
    // The intent is recorded as being expressed now in blockchain time
    [[eosio::action]]
    void log( name publisher, uint64_t userFingerprint, std::string& intentCategory, std::string& intentSubCategory, std::string& intentDetail) {
      require_auth( publisher );
      // TODO
    }

    // ***************
    // USER-FACING API
    // ***************

    // If the fingerprint is not claimed, it will be assigned to your user record
    // A single EOS user should be able to control several fingerprints (because they own several machines)
    [[eosio::action]]
    void claim(name user, uint64_t fingerprint) {
      require_auth( user );
      // Is this fingerprint associated with a user?
      auto iterator = _users.find(fingerprint);
      if ( iterator == _users.end() )
      {
        // The fingerprint isn't in the table - store it associated with the user
        _users.emplace(user, [&](auto& row ) {
          row.fingerprint = fingerprint;
          row.user = user;
        });
      }
      else {
        // The fingerprint is in the table. We're fine with it only if it's the same user
        // In any case, you can't change the claim of a fingerprint to another user
        eosio_assert(iterator->user.value == user.value, "Fingerprint is owned by a different user!");
      }
    }

    [[eosio::action]]
    void remove(name user, std::string& intentCategory, std::string& intentSubCategory, std::string& intentDetail) {
      require_auth( user );
      // TODO
    }

    // ********************
    // DATA CONSUMPTION API
    // ********************

    [[eosio::action]]
    void bid(name bidder, std::string& intentCategory, std::string& intentSubCategory, std::string& intentDetail, uint64_t maxUsers, uint64_t maxCentsPerUser, uint64_t beginTime, uint64_t endTime) {
      require_auth(bidder);
      // Future implementation
    }

/*
    [[eosio::action]]
    void update( name user, std::string& note ) {
      // to sign the action with the given account
      require_auth( user );

      // create new / update note depends whether the user account exist or not
      if (isnewuser(user)) {
        // insert new note
        _notes.emplace( _self, [&]( auto& new_user ) {
          new_user.prim_key    = _notes.available_primary_key();
          new_user.user        = user;
          new_user.note        = note;
          new_user.timestamp   = now();
        });
      } else {
        // get object by secordary key
        auto note_index = _notes.get_index<name("getbyuser")>();
        auto &note_entry = note_index.get(user.value);
        // update existing note
        _notes.modify( note_entry, _self, [&]( auto& modified_user ) {
          modified_user.note      = note;
          modified_user.timestamp = now();
        });
      }
    }*/

  private:
    /*
    bool isnewuser( name user ) {
      // get notes by using secordary key
      auto note_index = _notes.get_index<name("getbyuser")>();
      auto note_iterator = note_index.find(user.value);

      return note_iterator == note_index.end();
    }*/

    // *************
    // INTENTS TABLE
    // *************

    // This table records all of the collected data (intents) about a user fingerprint
    struct [[eosio::table]] intents {
      uint64_t      prim_key;  // primary key
      name          user;      // account name for the user
      name          publisher; // account name for the publisher

      // Intent hierarchic details
      std::string   intentCategory;
      std::string   intentSubCategory;
      std::string   intentDetail;

      uint64_t      timestamp; // the store the last update block time

      // Primary key
      auto primary_key() const { return prim_key; }

      // Secondary keys
      // Supported: uint64_t, uint128_t, uint256_t, double or long double

      uint64_t get_by_user() const { return user.value; }
      uint64_t get_by_pub() const { return publisher.value; }
    };

    typedef eosio::multi_index< name("intents"), intents,
      indexed_by< name("getbyuser"),
        const_mem_fun<intents, uint64_t, &intents::get_by_user>
      >,
      indexed_by< name("getbypub"),
        const_mem_fun<intents, uint64_t, &intents::get_by_pub>
      >
    > intents_table;

    intents_table _intents;

    // ******************
    // USER MAPPING TABLE
    // ******************

    // This data holds associates claimed user fingerprints with EOS user identities
    // Once associated, the user can control their data, manage permissions, etc
    struct [[eosio::table]] users {
      uint64_t      fingerprint;  // primary key
      name          user;         // account name for the user
      auto primary_key() const { return fingerprint; }
      uint64_t get_by_user() const { return user.value; }
    };

    typedef eosio::multi_index< name("users"), users,
      indexed_by< name("getbyuser"), const_mem_fun<users, uint64_t, &users::get_by_user> >
      > users_table;

    users_table _users;

};

EOSIO_DISPATCH( blockies, (log)(claim)(remove)(bid) )

