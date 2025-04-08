import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TaskCard from '../../components/layout/TaskCard.vue';
import type { Task } from '../../types';
import { nextTick } from 'vue';

describe('TaskCard.vue', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'test',
    status: 'todo'
  };

  it('renders task title correctly', () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      }
    });

    expect(wrapper.text()).toContain('Test Task');
  });

  it('displays done status correctly', () => {
    const doneTask: Task = { ...mockTask, status: 'done' };
    const wrapper = mount(TaskCard, {
      props: {
        task: doneTask,
        columnId: 'done'
      }
    });

    expect(wrapper.find('[title="Mark as done"]').classes()).toContain('bg-green-500');
    expect(wrapper.find('.line-through').exists()).toBe(true);
  });

  it('emits update event when toggling status', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      }
    });

    await wrapper.find('[title="Mark as done"]').trigger('click');
    const emitted = wrapper.emitted('update');
    
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0][0]).toEqual({
      ...mockTask,
      status: 'done'
    });
  });

  it('shows edit input when edit button clicked', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      }
    });

    await wrapper.find('[title="Edit"]').trigger('click');
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('emits update event when saving edit', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      }
    });

    await wrapper.find('[title="Edit"]').trigger('click');
    const input = wrapper.find('input');
    await input.setValue('Updated Task');
    await input.trigger('keyup.enter');

    const emitted = wrapper.emitted('update');
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0][0]).toEqual({
      ...mockTask,
      title: 'Updated Task'
    });
  });

  it('does not emit update if title is empty', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      }
    });

    await wrapper.find('[title="Edit"]').trigger('click');
    const input = wrapper.find('input');
    await input.setValue('');
    await input.trigger('keyup.enter');

    expect(wrapper.emitted('update')).toBeUndefined();
  });

  it('emits delete event when delete button clicked', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      }
    });

    await wrapper.find('[title="Delete"]').trigger('click');
    expect(wrapper.emitted('delete')).toHaveLength(1);
  });

  it('hides edit button for done tasks', () => {
    const doneTask: Task = { ...mockTask, status: 'done' };
    const wrapper = mount(TaskCard, {
      props: {
        task: doneTask,
        columnId: 'done'
      }
    });

    expect(wrapper.find('[title="Edit"]').exists()).toBe(false);
  });

  it('cancels edit on escape key', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      }
    });

    await wrapper.find('[title="Edit"]').trigger('click');
    await wrapper.find('input').trigger('keyup.esc');
    expect(wrapper.find('input').exists()).toBe(false);
  });

  it('focuses input when editing starts', async () => {
    const wrapper = mount(TaskCard, {
      props: {
        task: mockTask,
        columnId: 'todo'
      },
      attachTo: document.body 
    });
  
    await wrapper.find('[title="Edit"]').trigger('click');
    await nextTick(); 
  
    const input = wrapper.find('input').element;
    expect(document.activeElement).toBe(input);
  });
});