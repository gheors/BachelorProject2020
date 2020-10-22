import os
import csv
import assets
import natsort
from PIL import Image
import matplotlib.patches as patches
from matplotlib import pyplot as plt
from matplotlib.widgets import RectangleSelector


class DataSetCollection():

    def __init__(self, parent_dir, input_path, frame_size, categories, txtInputs):
        # the parent directory contains 3 children: input_frames, output_dataset, output_tags
        self.parent_dir = parent_dir
        print(parent_dir, input_path)
        self.input_path = input_path
        self.output_dir = parent_dir + '/' + 'DataSet_images'
        self.output_tags = parent_dir + '/' + 'DataSet_Tags.csv'
        # fields of the plotted frame
        self.frame_size = frame_size
        self.x1, self.x2, self.y2, self.y1 = 0, 0, 0, 0
        self.crop_mode = 'square'  # set starting crop mode
        self.delta = 400    # initial dimension of the square (l = 2delta)

        # object with categories and their options
        self.categories = categories
        self.categories_len = len(categories)

        # object with textBox inputs
        self.textInputs = txtInputs
        self.textInputs_len = len(txtInputs)

        # array as dictionary to map categories name and texBoxes as key
        self.outputs_preset = []    # and outputs as value

        # presets the main work that will be done
        self.presetting()   # inside the loop

        # take frames'directory and sort it
        self.frames_list = os.listdir(self.input_path)
        self.frames_list = natsort.natsorted(self.frames_list, reverse=False)

        # looping over all frames
        for self.image in self.frames_list:
            # path of the frame
            self.new_path = self.input_path + '/' + self.image
            # clear values of the "dictionary"
            self.outputs = self.outputs_preset
            # next is true
            self.next = False

            while not (self.next):
                self.clicked = False
                self.next = True
                self.prevRadio = None

                # plot figure and title
                self.fig = assets.add_figure(
                    (16, 9), "DataSet Building", (0.425, 0.95))

                # plot frame to be cropped
                self.plot_frame([0.03, 0.4, 0.5, 0.5])

                # plot remainders - crop mode, reuse
                self.plot_remainders()

                # Plot TextBoxe Buttons
                self.textBoxes_container = self.plot_inputs(
                    [0.57, 0.83, 0.125, 0.035], (0, 0.047))

                # Plot Radio Buttons
                self.radioButtons_container = self.plot_radios(
                    [0.03, 0.03, 0.125, 0.24])

                # select area to crop
                rs = RectangleSelector(
                    self.ax, self.onselect,
                    rectprops=dict(facecolor='None', linewidth=3, edgecolor=assets.fluo))

                # cropped image's name
                self.filename = "image" + str(self.count) + '.jpg'

                # connection ids
                self.activate_cids()
                plt.grid(False)
                plt.show()  # the magic function
            self.total_frames -= 1
        os.remove(self.new_path)

    def presetting(self):                        # preset the script to do work
        # icons remainders
        self.sq1_1 = 'images_assets/1_1.png'
        self.selector = 'images_assets/selector.png'
        self.reuse_pic = 'images_assets/reuse.png'
        self.sq1_1_25 = 'images_assets/1_1_25.png'
        self.selector25 = 'images_assets/selector25.png'
        self.reuse_pic25 = 'images_assets/reuse25.png'

        # used to draw the square deleting the old one and
        self.old_square = None  # drawing a new one

        # ids = categories' label + inputs' label
        ids = []  # used to set the ids of csv file
        for i in range(self.categories_len):
            label = self.categories[i][0]
            ids.append(label)
            self.outputs_preset.append((label, ''))  # keys of dictionary

        for i in range(self.textInputs_len):
            label = self.textInputs[i]
            ids.append(label)
            self.outputs_preset.append((label, ''))  # keys of dictionary
        ids.append("filename")

        # creation of output directory if not exists
        if not (os.path.isdir(self.output_dir)):
            os.mkdir(self.output_dir)
            print(self.output_dir)

         # creation of csv file if not exists
        if not (os.path.isfile(self.output_tags)):
            csv_output = open(self.output_tags, "w")
            writer = csv.writer(csv_output, delimiter=",")
            # writing ID's row on csv
            writer.writerow(ids)
            csv_output.close()

        # count how many images are as input
        self.total_frames = len(os.listdir(self.input_path))

        # count how many images are as output
        self.count = 1 + len(os.listdir(self.output_dir))
        print(self.count)

    def plot_frame(self, coords):                            # plot frame image
        self.ax = self.fig.add_axes(coords)          # sets plot position
        self.ax.axes.get_xaxis().set_visible(False)  # axis x with values hidden
        self.ax.axes.get_yaxis().set_visible(False)  # axis y with values hidden
        self.ax.set_ylim(self.frame_size[1], 0)      # sets y lim on the plot
        self.ax.set_xlim(0, self.frame_size[0])      # sets y lim on the plot
        # color borders picture
        assets.color_spines(self.ax, assets.grey)

        # open the frame and plot it
        self.current_image = open(self.new_path, 'rb')
        self.img = Image.open(self.current_image)
        plt.imshow(self.img)
        # plot label frame
        plt.text(0, -25, "Select area to crop",
                 color='#ADADAD', fontsize=14)

        # plot counters of total frames and outputs
        self.fig.text(0.035, 0.37, "frames: " + str(self.total_frames),
                      color='#ADADAD',
                      fontsize=10)
        self.fig.text(0.035, 0.345, "dataset: " + str(self.count-1),
                      color='#ADADAD',
                      fontsize=10)

    def plot_remainders(self):           # plot reuse and crop mode remainiders

        self.ax_widget1 = assets.plot_image(          # widget square remainder
            [0.395, 0.34, 0.05, 0.05], self.fig, self.sq1_1)

        self.ax_widget2 = assets.plot_image(        # widget selector remainder
            [0.44, 0.33, 0.05, 0.05], self.fig, self.selector25)

        self.ax_widget3 = assets.plot_image(           # widget reuse remainder
            [0.485, 0.33, 0.05, 0.05], self.fig, self.reuse_pic25)

    def plot_radios(self, pos_butn1):               # ad radios btns to the plot
        radios_container = []
        for i in range(self.categories_len):
            title = self.categories[i][0]
            options = self.categories[i][1]
            # add radio buttons per each category
            radio_button = assets.add_radioButton(self.fig,
                                                  pos_butn1,  # position button 1
                                                  title,      # label of radioBtn
                                                  options,       # buttons option
                                                  i,               # global index
                                                  self.update_ouputs)  # callback
            radios_container.append(radio_button)
            # move the  x ax to the right for next btn
            pos_butn1[0] += 0.135
        return radios_container

    def plot_inputs(self, coords_box1, adjust):      # add textboxes to the plot
        inputs_container = []
        index = self.categories_len
        for i in range(self.textInputs_len):
            title = self.textInputs[i]
            text_box = assets.add_Input_text(self.fig,
                                             coords_box1,
                                             adjust,        # added to label pos
                                             title,          # label of radioBtn
                                             index + i,           # global index
                                             self.update_texbox)      # callback
            inputs_container.append(text_box)
            # move the y ax to bottom for next btn
            coords_box1[1] -= 0.1
        return inputs_container

    def update_ouputs(self, title, index, labels, text):     # update 'array dictionary'
        # radio & txtBox btns' callback
        self.outputs[index] = (title, text)

        if index < self.categories_len:
            for el in labels:
                txt = el.get_text()
                if txt == text:
                    if self.prevRadio != None:
                        self.prevRadio.set_color(assets.light_grey)
                    el.set_color(assets.fluo)
                    self.prevRadio = el
                self.fig.canvas.draw()

    def update_texbox(self, title, index, text):
        # txtBox btns' callback
        self.outputs[index] = (title, text)

    def extract_values_row(self):  # extract values from dictionary for csv row
        values = []                          # building array wth final outputs
        for i in range(len(self.outputs)):
            if self.outputs[i][1] == '':
                values.append('__unset__')
            else:
                values.append(self.outputs[i][1])

        values.append(self.filename)         # append name of the cropped image
        return values

    def onmove(self, event):                     # add the square to the cursor
        if event.xdata != None and event.ydata != None:
            if self.old_square:      # each time that cursor posn changes, draw
                self.old_square.remove()       # new square and remove previous

            self.x1 = event.xdata - self.delta      # calculating starting posn
            self.y1 = event.ydata - self.delta         # for drawing the square
            self.x2, self.y2 = self.delta*2, self.delta*2      # width & height
            # top x y lim
            if self.x1 < 0:      # set new coords of square if outside of frame
                self.x2 = self.x2 + self.x1
                self.x1 = 0

            if self.y1 < 0:
                self.y2 = self.y2 + self.y1
                self.y1 = 0
            # bottom x y lim
            if self.x1 + self.x2 > self.frame_size[0]:
                self.x2 = self.frame_size[0] - self.x1

            if self.y1 + self.y2 > self.frame_size[1]:
                self.y2 = self.frame_size[1] - self.y1

            self.square = patches.Rectangle(   # draw the recttanle from x1 y1
                (self.x1, self.y1), self.x2, self.y2,               # to x2 y2
                linewidth=3, edgecolor=assets.fluo, facecolor='None')      # set style

            self.old_square = self.square                   # update old square
            self.ax.add_patch(self.square)        # add the square to the frame
            self.fig.canvas.draw()                          # update the figure

    def zoom_square(self, event):     # increase or decrease crop mode's square
        if event.key == 'cmd+a':             # increase by 100px the side of square
            if self.delta >= 550:                  # set upper bound to 1100 px
                self.delta = 400
            self.delta += 50

        if event.key == '-':             # decrease by 100px the side of square
            if self.delta <= 100:                    # set lower bound to 200px
                self.delta = 400
            self.delta -= 50

        if event.key == 'cmd+z' or event.key == 'a':            # remove old square
            if self.old_square != None:
                self.square.remove()
                self.old_square = None

    def cropSquare(self):                                    # crop square area
        if self.clicked == False:             # first click block the square on
            self.clicked = True                                 # selected area
            self.fig.canvas.mpl_disconnect(self.cid)        # stops onmove func
        else:                                # second click unblocks the square
            self.clicked = True
            self.clicked = False
            self.cid = self.fig.canvas.mpl_connect(     # abilitate onmove func
                'motion_notify_event', self.onmove)

    def cropSelector(self, eclick, erelease):               # crop selected area
        # clicked event = (ev.press, ev.release)
        if self.clicked == False:
            self.clicked = True
            # draw selected area from
            self.x1, self.y1 = eclick.xdata, eclick.ydata   # event press coords
            self.x2, self.y2 = erelease.xdata, erelease.ydata       # to release

            if self.y1 > self.y2:  # allow to start from top to bottom & inverse
                self.y1, self.y2 = self.y2, self.y1

            if self.x1 > self.x2:  # allow to start from left to right & inverse
                self.x1, self.x2 = self.x2, self.x1

            self.select_area = patches.Rectangle(
                (self.x1, self.y1),               # draw the rectanle from x1 y1
                self.x2-self.x1, self.y2-self.y1,             # width and height
                linewidth=3, edgecolor=assets.fluo, facecolor='None')            # style

            # add the selecte area to the frame
            self.ax.add_patch(self.select_area)
            self.fig.canvas.draw()                           # update the figure

        else:                               # second click deletes selected area
            self.select_area.remove()
            self.clicked = False

    def onselect(self, eclick, erelease):      # on select use current crop mode
        if self.crop_mode == 'square':
            self.cropSquare()

        elif self.crop_mode == 'selector':
            self.cropSelector(eclick, erelease)

    def switchBtn(self, event):    # switch button allow to change the crop mode
        if event.key == 'cmd+e':
            if self.crop_mode == 'square':        # from square to selector mode
                self.crop_mode = 'selector'

                # clear frame's plot
                self.fig.canvas.mpl_disconnect(self.cid)
                if self.old_square != None:
                    self.square.remove()
                    self.old_square = None

                # update crop mode remainders
                self.ax_widget1.remove()
                self.ax_widget1 = assets.plot_image(
                    [0.395, 0.33, 0.05, 0.05], self.fig, self.sq1_1_25)

                self.ax_widget2.remove()
                self.ax_widget2 = assets.plot_image(
                    [0.44, 0.34, 0.05, 0.05], self.fig, self.selector)

                self.fig.canvas.draw()                       # update the figure

            elif self.crop_mode == 'selector':    # from square to selector mode
                self.crop_mode = 'square'

                if self.clicked:                            # clear frame's plot
                    self.select_area.remove()

                self.cid = self.fig.canvas.mpl_connect(  # abilitate onmove func
                    'motion_notify_event', self.onmove)

                # update crop mode remainders
                self.ax_widget1.remove()
                self.ax_widget1 = assets.plot_image(
                    [0.395, 0.34, 0.05, 0.05], self.fig, self.sq1_1)
                self.ax_widget2.remove()
                self.ax_widget2 = assets.plot_image(
                    [0.44, 0.33, 0.05, 0.05], self.fig, self.selector25)

                self.fig.canvas.draw()                     # update frame's plot
            self.clicked = False

    def reuse_image(self, event):              # set current frame as next frame
        if event.key == 'cmd+r':
            if (self.next):
                self.next = False

                self.ax_widget3.remove()                     # update remainders
                self.ax_widget3 = assets.plot_image(
                    [0.485, 0.34, 0.05, 0.05], self.fig, self.reuse_pic)
                self.fig.canvas.draw()                           # update figure

            else:
                self.next = True

                self.ax_widget3.remove()                     # update remainders
                self.ax_widget3 = assets.plot_image(
                    [0.485, 0.33, 0.05, 0.05], self.fig, self.reuse_pic25)
                self.fig.canvas.draw()                           # update figure

    def checked(self):                   # check if area to crop is selected and
        if self.clicked:                             # at leat one value  is set
            for i in range(len(self.output_row)-1):
                if self.output_row[i] != '__unset__':
                    return True

    def quit_figure(self, event):  # update csv, crop & save image, delete frame
        if event.key == 'cmd+q':
            self.output_row = self.extract_values_row()

            if self.checked():
                csv_output = open(self.output_tags, "a")
                writer = csv.writer(csv_output, delimiter=",")
                # write tags in csv file
                writer.writerow(self.output_row)
                csv_output.close()

                if self.crop_mode == 'selector':          # set width and height
                    width = self.x2
                    height = self.y2
                else:
                    width = self.x1 + self.x2
                    height = self.y1 + self.y2

                self.cropped_img = self.img.crop(                  # crop image
                    (self.x1, self.y1, width, height))
                self.cropped_img.save(                             # save image
                    self.output_dir + '/' + self.filename)
                self.current_image.close()

                if self.next:        # remove current frame if reuse not active
                    os.remove(self.new_path)
                self.count += 1
            plt.close()

    def activate_cids(self):          # set all connection id of events and callbacks
        if self.crop_mode == 'square':
            self.cid = self.fig.canvas.mpl_connect(
                'motion_notify_event', self.onmove)

        self.cid2 = self.fig.canvas.mpl_connect(
            'key_press_event', self.quit_figure)

        self.cid3 = self.fig.canvas.mpl_connect(
            'key_press_event', self.reuse_image)

        self.cid4 = self.fig.canvas.mpl_connect(
            'key_press_event', self.switchBtn)

        self.cid5 = self.fig.canvas.mpl_connect(
            'key_press_event', self.zoom_square)

        self.cid6 = self.fig.canvas.mpl_connect(
            'key_press_event', self.zoom_square)


roles = ["protagonist", "antagonist", "secondary", "bit role"]
categories = [("roles", roles),
              ("roles", roles)]
inputs = ["name of character"]

x = DataSetCollection('All DataSets', 'All DataSets/test0/frames',
                      (1920, 1080), categories, inputs)
