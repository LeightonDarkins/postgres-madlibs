create TABLE present_tense_verbs (
  id  BIGSERIAL primary key,
  word varchar(80) not null
);

create TABLE past_tense_verbs (
  id  BIGSERIAL primary key,
  word varchar(80) not null
);

create TABLE future_tense_verbs (
  id  BIGSERIAL primary key,
  word varchar(80) not null
);
