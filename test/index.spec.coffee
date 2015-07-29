require './helpers'

describe "Stop Map", ->

  beforeAll ->
    moduleUnderTest = "../src/index.jsx"
    mockModules = [
      "offcourse-map-point"
    ]
    { @Component, @spy } = mockModule moduleUnderTest, mockModules

  afterAll ->
    disableMocks()

  Given -> 
    testdom "<html><body></body></html>"
    id = "2"
    collection = [{id: 1},{id: 2}]
    @props  = { collection, id }

  describe "general", ->
    When  -> @subject  = renderElement @Component, @props 
    Then  -> @classes = @subject.className.split ' '
    And   -> @classes.includes "stop"
    And   -> !@classes.includes "stop-is-complete"
    And   -> !@classes.includes "stop-is-highlight"

  describe "item complete", ->
    Given ->
      @props.complete = true
    When  -> @subject  = renderElement @Component, @props 
    Then  -> @classes = @subject.className.split ' '
    And   -> @classes.includes "stop-is-complete"
    And   -> !@classes.includes "stop-is-highlight"

  describe "item highlight", ->
    Given ->
      @props.highlight = true
    When  -> @subject  = renderElement @Component, @props 
    Then  -> @classes = @subject.className.split ' '
    And   -> @classes.includes "stop-is-highlight"
    And   -> !@classes.includes "stop-is-complete"

  describe "hover item", ->
    Given  -> 
      @props.handleHover = sinon.spy()
      @subject = renderElement @Component, @props 
    When   -> TestUtils.SimulateNative.mouseOver(@subject);
    Then   -> expect(@props.handleHover).to.be.calledWith(true);

  describe "click checkbox", ->
    Given  -> 
      @props.handleClick = sinon.spy()
      @subject = renderElement @Component, @props 
    When   -> TestUtils.Simulate.click(@subject)
    Then   -> expect(@props.handleClick).to.be.called;
