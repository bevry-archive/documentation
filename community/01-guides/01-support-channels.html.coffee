###
url: '/support'
###

h2 "Community Support Channels"

text """
	<t:premiumsupport render="markdown">
	Community Support is provided by people facing the same issues whom team up to help each other during their spare time. Unlike Paid Premium Support, there are no guarantees.
	</t:premiumsupport>
	"""

text @partial "content/subblock.html.coffee", {
	avatar: '/images/stackoverflow.gif'
	heading: """
		<a href="http://stackoverflow.com/questions/ask">Stack Overflow</a>
		"""
	subheading: "Stackoverflow owns &amp; manages, Bevry participates"
	content: """
		<t render="markdown">
		StackOverflow is a community of passionaite programmers dedicated to solving problems for each other for any type of programming questions. As you post questions and answers you’ll earn reputation which gives you more abilities on the site. *Be aware that this is a community for anything programming, not just Bevry related projects. So you must state the project that you’re using in your question.* Some of our projects already have tags that you can use too.

		Use the tags [#docpad](http://stackoverflow.com/questions/tagged/docpad) for DocPad, [#history.js](http://stackoverflow.com/questions/tagged/history.js) for History.js, and [#bevry](http://stackoverflow.com/questions/tagged/bevry) for everything else. *If you’re new to Stack Overflow, read their [FAQ](http://stackoverflow.com/faq) before posting.*
		</t>
		"""
}

text @partial "content/subblock.html.coffee", {
	avatar: '/images/irc.gif'
	heading: """
		<a href="irc://chat.freenode.net:6997/bevry">Internet Relay Chat (IRC)</a>
		"""
	subheading: "Bevry owns, manages &amp; participates"
	content: """
		<t render="markdown">
		Bevry opperates several IRC chatrooms the freenode chat server that you can find our team hanging out on during business hours. Use [#bevry](irc://chat.freenode.net:6997/bevry) for projects that do not have their own channel.</p>

		Channels we operate:
		[#bevry](irc://chat.freenode.net:6997/bevry),
		[#docpad](irc://chat.freenode.net:6997/docpad),
		[#history.js](irc://chat.freenode.net:6997/history.js)
		</t>
		"""
}



h2 "Other Channels"

text """
	<t:premiumsupport render="markdown">
	Do not use these channels for questions or support.
	</t:premiumsupport>
	"""

text @partial "content/subblock.html.coffee", {
	avatar: '/images/octocat.gif'
	heading: """
		<a href="https://github.com/bevry">GitHub</a>
		"""
	subheading: "GitHub owns, Bevry manages &amp; participates"
	content: """
		<t render="markdown">
		GitHub is the social programming community and the place to host your open-source projects. Bevry hosts all their projects on github, and uses the built-in Issues functionality for development tasks and the discussions surrounding them. For instance, if you send in an email and that spawns a new development task we may reference you to the github issue behind it so you can track and participate in its progress.
		</t>
		"""
}

text @partial "content/subblock.html.coffee", {
	avatar: '/images/twitter.gif'
	heading: """
		<a href="https://twitter.com/bevryme">Twitter</a>
		"""
	subheading: "Bevry owns, manages &amp; participates"
	content: """
		<t render="markdown">
		Bevry operates several twitter accounts you can reach  and mention us on. Use [@BevryMe](https://twitter.com/bevryme) for projects that do not have their own account.

		Accounts we operate:
		[@BevryMe](https://twitter.com/bevryme),
		[@DocPad](https://twitter.com/docpad),
		[@HistoryJS](https://twitter.com/historyjs),
		[@QueryEngine](https://twitter.com/queryengine),
		[@StartupHostel](https://twitter.com/startuphostel)
		</t>
		"""
}