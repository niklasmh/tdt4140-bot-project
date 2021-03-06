<template>
  <div class="page-content">
    <h1 class="subject-title">{{subject.subjectCode}} - {{subject.title}}</h1>
    <div class="join-leave" v-if="$store.state.user.usertype === 'Student'">
      <button @click="joinSubject" v-if="!joined"> Join Subject</button>
      <button @click="leaveSubject" v-else> Leave Subject </button>
    </div>
    <h1>Connected topics</h1>
    <div v-if="relatedTopics.length">
      <div class="topic-info topic-info-header">
            <div class="topic-title">Title</div>
            <div class="topic-description">Description</div>
          </div>
          <div v-for="t in relatedTopics" class="topic-info">
            <div class="topic-title"><router-link :to="'/topic/' + t.id">{{ t.title }}</router-link></div>
            <div class="topic-description">{{ t.description }}</div>
            <button @click="unrelateTopic(t)" v-if="canAdd" class="topic-relate">Unrelate</button>
          </div>
    </div>
    <div v-else>
      This subject is not connected to any topics.
    </div>
    <div v-if="canAdd">
      <h1>Add topics</h1>
      <div class="topic-add-fields">
        <label>Title: </label>
        <input @keydown.enter="addTopic" v-model="topic.title" type="text" />
        <br>
        <label>Description: </label>
        <input @keydown.enter="addTopic" v-model="topic.description" type="text" />
        <p>
          <button @click="addTopic">Add</button>
          <span class="error">{{ addFeedback }}</span>
        </p>
      </div>
      <div class="searchTopic">
        <input v-model="search" v-on:keyup="restrictTopics" type="text" placeholder="Search for topic" />
      </div>
      <div v-if="topics.length">
        <div class="topic-info topic-info-header">
          <div class="topic-title">Title</div>
          <div class="topic-description">Description</div>
          <div class="topic-relate"></div>
        </div>
        <div v-for="t in topics" v-if="!isRelated(t)" class="topic-info">
          <div class="topic-title">{{ t.title }}</div>
          <div class="topic-description">{{ t.description }}</div>
          <button @click="relateTopic(t)" class="topic-relate">Connect</button>
        </div>
      </div>
      <div v-else>
        No topics available.
      </div>
      <p class="error">{{ getFeedback }}</p>
    </div>
  </div>
</template>

<script>
import { api } from 'api'

export default {
  name: 'subjectpage',
  data () {
    return {
      relatedTopics: [],
      topic: {
        title: '',
        description: ''
      },
      joined: false,
      addFeedback: '',
      topics: [],
      allTopics: [],
      search: '',
      canAdd: false,
      getFeedback: '',
      subject: {
        title: '',
        description: '',
        institution: '',
        subjectCode: '',
        id: this.$route.params.id
      }
    }
  },
  watch: {
    '$route' () {
      this.updateData()
    }
  },
  created () {
    this.updateData()
    this.checkCanAdd()
    this.checkJoined()
  },
  methods: {
    addTopic () {
      this.addFeedback = ''
      api.addTopic(this, this.topic, (data) => {
        let t = data
        this.allTopics.push({
          title: t.title,
          description: t.description,
          id: t.id,
          rating: 0
        })
        this.restrictTopics()
        this.addFeedback = 'Added to database.'
      }, () => {
        this.addFeedback = 'Failed to add topic.'
      })
    },
    relateTopic (topic) {
      api.relateSubjectTopic(this, topic, this.subject, (data) => {
        if (data['already-related'] !== data['is-related']) {
          this.relatedTopics.push(topic)
        }
      })
    },
    unrelateTopic (topic) {
      api.unrelateSubjectTopic(this, topic, this.subject, (data) => {
        if (data['already-related'] !== data['is-related']) {
          this.relatedTopics.splice(this.relatedTopics.indexOf(topic), 1)
        }
      })
    },
    restrictTopics () {
      this.topics = []
      if (this.search === '') {
        this.topics = this.allTopics
      } else {
        for (let topicIndex = 0; topicIndex < this.allTopics.length; topicIndex++) {
          let topic = this.allTopics[topicIndex]
          if (topic.title.toLowerCase().includes(this.search.toLowerCase())) {
            this.topics.push(topic)
          }
        }
      }
    },
    joinSubject () {
      api.joinSubjectParticipant(this, parseInt(this.$route.params.id), (data) => {
        this.joined = data['is-joined']
      }, () => {})
    },
    leaveSubject () {
      api.leaveSubjectParticipant(this, parseInt(this.$route.params.id), (data) => {
        this.joined = data['is-joined']
      }, () => {})
    },
    isRelated (topic) {
      for (var index = 0; index < this.relatedTopics.length; index++) {
        if (this.relatedTopics[index].id === topic.id) {
          return true
        }
      }
      return false
    },
    updateData () {
      api.getTopics(this, (data) => {
        this.allTopics = data.topics
        this.restrictTopics()
      }, () => {
        this.allTopics = []
      })

      api.getSubjectById(this, this.$route.params.id, (data) => {
        this.subject = data
      }, () => {
        window.location.href = '/subject'
      })

      api.getRelatedTopics(this, this.$route.params.id, (data) => {
        this.relatedTopics = data.related_topics
      })
    },
    checkCanAdd () {
      if (this.$store.state.user.usertype === 'Admin') {
        this.canAdd = true
      } else if (this.$store.state.user.usertype === 'Teacher') {
        api.getSubjectsEditor(this, (data) => {
          for (let subjectIndex in data.subjects) {
            if (data.subjects[subjectIndex].id === parseInt(this.$route.params.id)) {
              this.canAdd = true
              break
            }
          }
        }, () => {})
      }
    },
    checkJoined () {
      if (this.$store.state.user.usertype === 'Student') {
        api.isParticipantSubject(this, parseInt(this.$route.params.id), (data) => {
          this.joined = data.joined
        }, () => {})
      }
    }
  }
}
</script>

<style scoped>

.topic-add-fields > label {
  width: 5em;
  display: inline-block;
}

.topic-title, .topic-description, .topic-relate {
  padding-right: 20px;
  flex-grow: 1;
  width: 120px;
}

.topic-relate {
	flex: 0 0 90px;
	cursor: pointer;
  align-self: center;
}

.topic-description {
  flex-grow: 3;
}

.topic-info:nth-child(even) {
  background-color: #ccc;
  background-color: var(--n-color-3);
  border-radius: 4px;
}

.topic-info {
  display: flex;
  flex-flow: row wrap;
  padding: 10px 12px;
}

.topic-info-header {
  font-weight: bold;
  font-size: 1.2em;
}

.subject-title, .join-leave {
  display: inline-block;
}

.join-leave {
  float: right;
}

</style>
